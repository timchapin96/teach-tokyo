class PagesController < ApplicationController
  def home
  end
  puts "SENDGRID_USERNAME: #{ENV.fetch('SENDGRID_USERNAME', nil)}"
  puts "SENDGRID_PASSWORD: #{ENV.fetch('SENDGRID_PASSWORD', nil)}"
  puts "SENDMAIL_USERNAME: #{ENV.fetch('SENDMAIL_USERNAME')}"
  puts "SENDMAIL_PASSWORD: #{ENV.fetch('SENDMAIL_PASSWORD')}"
end
