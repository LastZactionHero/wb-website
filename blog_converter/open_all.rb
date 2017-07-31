# Open every blog post in a browser
post_filenames = Dir.glob("../content/blog/*.md")
local_post_urls = post_filenames.map{ |fn| "http://localhost:1313/blog/#{fn.rpartition('/').last.rpartition('.').first}" }
local_post_urls.each { |url| `open #{url}` }
