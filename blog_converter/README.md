# Wordpress to Markdown Converter
Converts Wordpress post exports to Hugo markdown pages, with meta data. The script attempts some basic post-processing to clean up the files where possible.

This was designed for a Wordpress export file containing *posts* only- unsure what would happen if other Wordpress content is included.

Markdown files are added to `/content/blog`

A second script `image_collector` downloads all image assets, saves them locally, and updates the post.

## Usage:

```
ruby ./convert_export.rb /path/to/wordpress_export.xml /path/to/content/blog
ruby ./image_collector.rb /path/to/content/blog

Example:
ruby ./convert_export.rb ./workbright.wordpress.2017-07-07.xml ../content/blog/
ruby ./image_collector.rb ../content/blog/
```

