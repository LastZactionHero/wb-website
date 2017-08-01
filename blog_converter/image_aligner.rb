require 'pry'

def write_to_file(file_path, content)
  file = File.open(file_path, 'w')
  file << content
  file.close
end

file_paths = Dir.glob('../content/blog/*.md')
file_paths.each_with_index do |file_path, file_path_idx|
  puts "#{file_path_idx}/#{file_paths.length}"

  url = "http://localhost:1313/blog/#{file_path.rpartition('/').last.rpartition('.').first}"
  `open #{url}`
  
  content = File.read(file_path)
  original_content = content.clone # Save incase reverted

  # Replace markdown image tags with shortcode for image alignment, alternated right and left
  md_image_tags = content.scan(/!\[[^\]]+\]\([^\)]+\)/)
  md_image_tags.each_with_index do |md_image_tag, md_image_idx|
    alignment = md_image_idx % 2 == 0 ? :right : :left
    image_url = md_image_tag.match(/(?<=\()[^\)]+/).to_s

    shortcode_image_tag = "{{% image_aligned src=\"#{image_url}\" align=\"#{alignment}\" width=\"256px\" %}}"

    content.gsub!(md_image_tag, shortcode_image_tag)
  end

  # Write changes to file
  write_to_file(file_path, content)

  # Verify that it looks ok, or revert
  puts "Looks good? (y/n)"
  is_ok = gets.strip
  if is_ok == 'n'
    puts "Reverting..."
    write_to_file(file_path, original_content)
  end
end