class Game < ApplicationRecord
  belongs_to :user
  validates :title, presence: { message: "Title cannot be empty" }
end
