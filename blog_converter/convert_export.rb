require 'nokogiri'
require 'reverse_markdown'
require 'date'
require 'pry'

content = File.read(ARGV[0])
content = Nokogiri::XML.parse(content)

post_items = content.css('item')

post_items.each do |item|
  title = item.xpath('title').first.text.gsub('"', '\"')
  pub_date = item.xpath('pubDate').first.text
  creator = item.xpath('dc:creator').first.text
  content_html = item.xpath('content:encoded').first.text
  categories = item.xpath('category').select { |c| c.attributes['domain'].value == 'category' }.map{ |c| c['nicename'] }.uniq
  tags = item.xpath('category').select { |c| c.attributes['domain'].value == 'post_tag' }.map{ |c| c['nicename'] }.uniq

  description = nil
  item.xpath('wp:postmeta').each do |postmeta|
    if postmeta.xpath("wp:meta_key").text == "_yoast_wpseo_metadesc"
      description = item.xpath('wp:postmeta')[20].xpath("wp:meta_value").text
      break
    end
  end

  # Convert newlines to to line breaks
  content_html.gsub!("\n\n", "<br/><br/>")

  # Remove non-breaking space characters
  content_html.gsub!("\u00A0", " ")

  # Remove footer logo
  content_html.gsub!('<a href="https://workbright.com/wp-content/uploads/2015/06/WorkBright-W-Top-225pxHR.png"><img class="alignleft size-full wp-image-564" src="https://workbright.com/wp-content/uploads/2015/06/WorkBright-W-Top-225pxHR.png" alt="WorkBright-W-Top-225pxHR" width="225" height="106" /></a>', "")

  # Fix the caption tag
  content_html.scan(/\[caption[^\]]+\][^\]]+\]/).each do |caption_md_tag|
    caption_html_replace = '<br/><br/>' + caption_md_tag.gsub(/\[[^\]]+\]/, '').rpartition('>').first + '>' + '<br/><br/>'
    content_html.gsub!(caption_md_tag, caption_html_replace)
  end

  content_markdown = ReverseMarkdown.convert(content_html).strip

  # Remove brand logo and footer
  content_markdown = content_markdown.partition("[Request a demonstration").first.strip

  # Convert non-breaking space to newline
  content_markdown.gsub!("&nbsp;", "\n\n")

  # Insert a space before ordered list items
  content_markdown.gsub!(/\n[0-9]+\. \*\*/, "\n\\0")


  if content_markdown.index("**") == 0
    title_end_idx = content_markdown.index("**", 2)
    content_markdown = content_markdown[(title_end_idx+2)..-1].strip
  end

  alt_slug = title.gsub(/[^A-z0-9]+/, '-').downcase.gsub(/^-+/, "").gsub(/-+$/, "")

  link = item.xpath('link').first.text
  link = link.slice(0..-2) if link.end_with?("/")
  slug = link.rpartition("/").last
  slug = alt_slug if slug.start_with?('?')

  body = <<-EOF
---
title: "#{title}"
author: "#{creator.capitalize}"
date: #{Date.parse(pub_date).to_s.gsub("-0001", "2017")}
tags:
#{tags.map{|t| "  - \"#{t}\""}.join("\n")}
categories:
#{categories.map{|t| "  - \"#{t}\""}.join("\n")}
slug: #{slug}
description: #{description}
---
#{content_markdown}
EOF

  output_filename = [ARGV[1], "#{slug}.md"].join('/')
  f = File.open(output_filename, 'w')
  f << body
  f.close
end