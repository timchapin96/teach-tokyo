module ApplicationHelper
  def show_svg(path)
    if File.exist?("app/assets/images/#{path}")
      File.open("app/assets/images/#{path}", "rb") do |file|
        raw file.read.force_encoding("UTF-8")
      end
    else
      puts "File not found: app/assets/images/#{path}"
    end
  end

  def random_cloud
    svh_top = rand(10..90)
    svw_left = rand(-100..100)
    scale = rand(2..4)
    return [svh_top, svw_left, scale]
  end
end
