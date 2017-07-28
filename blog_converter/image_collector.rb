require 'pry'

blog_dir_path = ARGV[0] 
image_dir_path = "../static/images/blog/"

files = Dir.glob("#{blog_dir_path}/*.md")

files.each_with_index do |filename, file_idx|
  puts "#{file_idx}/#{files.count}"
  puts "#{filename}"

  content = File.read(filename)

  image_tags = content.scan(/\!\[[^\]]*\]\([^\)]+\)/)
  next if image_tags.empty?

  post_slug = filename.rpartition("/").last.slice(0..-4)
  image_post_dir_path = "#{image_dir_path}/#{post_slug}"
  Dir.mkdir(image_post_dir_path) unless Dir.exists?(image_post_dir_path)

  image_tags.each do |image_tag|
    image_url = image_tag.scan(/(?<=\()[^\)]+(?=\))/).first
    puts " -- Checking: #{image_url}"
    next unless image_url.start_with?("http")

    image_filename = image_url.rpartition("/").last
    output_filepath = "#{image_post_dir_path}/#{image_filename}"

    `curl #{image_url} > #{output_filepath}`

    relative_image_path = "/images/blog/#{post_slug}/#{image_filename}"
    puts " -- fetching: #{image_url}"
    content.gsub!(image_url, relative_image_path)
  end

  file = File.open(filename, 'w')
  file << content
  file.close
end