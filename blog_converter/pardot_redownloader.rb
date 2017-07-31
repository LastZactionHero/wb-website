require 'pry'

post_directories = Dir.glob("../static/images/blog/*")

post_directories.each do |post_directory|
  image_paths = Dir.glob("#{post_directory}/*")

  image_paths.each do |image_path|
    image_content = File.read(image_path)
    next unless image_content.start_with?("<html>")

    if image_content.include?("pardot")
      url = image_content.match("(?<=url=)[^\"]+").to_s
      `curl #{url} > #{image_path}`
    else
      puts "UNKNOWN FORMAT!"
      puts "#{post_directory}"
      puts "#{image_path}"
      puts image_content
      puts "\n\n"
    end
  end
end