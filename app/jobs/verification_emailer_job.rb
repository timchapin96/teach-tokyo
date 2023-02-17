class VerificationEmailerJob < ApplicationJob
  queue_as :default

  def perform
    puts "I'm starting the fake job"
    sleep 3
    puts "OK i'm done"
  end
end
