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

# Terrible:
# 3-retention-ideas-try-month-december-2015
# advanced-user-permissions-june-2016
# behind-the-scenes-of-your-account-october-2015
# ntroducing-robust-reporting-september-2015
# new-image-editor-august-2016
# new-support-center-april-2016
# recruiting-with-social-media-auto-approve-forms-january-2016
# revamped-9-july-2016
# the-mission-critical-workforce-february-2016-2
# the-mission-critical-workforce-february-2016
# user-import-now-available-may-2016
# workbrights-open-api-is-here-october-2015