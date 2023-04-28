module ApplicationHelper
  def show_svg(path)
    if File.exist?("app/assets/images/#{path}")
      File.open("app/assets/images/#{path}", "r:UTF-8") do |file|
        raw file.read
      end
    else
      puts "File not found: app/assets/images/#{path}"
    end
  end
end
