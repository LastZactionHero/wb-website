# Script to grab the banner image from existing blog posts
require 'nokogiri'
require 'open-uri'

post_filenames = Dir.glob("../content/blog/*.md")

post_filenames.each_with_index do |post_filename, post_idx|
  next if post_idx < 7

  puts "#{post_idx}/#{post_filenames.length}: #{post_filename}"

  content = File.read(post_filename)
  if content.include?('banner:') # already configured manually, skip it
    puts " - Banner exists. Skipping."
    next
  end

  post_slug = post_filename.rpartition('/').last.gsub('.md', '')
  post_url = "https://workbright.com/#{post_slug}"
  begin
    doc = Nokogiri::HTML(open(post_url))
  rescue OpenURI::HTTPError => e
    puts " * Error downloading post. #{e}. Skipping."
    next
  end
  puts " - Downloading blog post..."

  banner_image_tag = doc.root.xpath('//meta').find{ |c| c['property'] == 'og:image' }
  unless banner_image_tag
    puts " * No banner image tag! Skipping."
    next
  end
  image_url = banner_image_tag['content']
  image_extension = image_url.rpartition('.').last
  unless image_url && image_url.length > 0
    puts " * No image url! Skipping."
    next
  end

  image_post_dir_path = "../static/images/blog/#{post_slug}"
  Dir.mkdir(image_post_dir_path) unless Dir.exists?(image_post_dir_path)

  puts " - Downloading image: #{image_url}"
  output_filepath = "#{image_post_dir_path}/banner.#{image_extension}"
  `curl #{image_url} > #{output_filepath}`

  puts " - Updating file"
  banner_image_url = "#{post_slug}/banner.#{image_extension}"
  slug_index = content.index('slug:')
  content.insert(slug_index, "banner: \"#{banner_image_url}\"\n")

  file = File.open(post_filename, 'w')
  file << content
  file.close
end