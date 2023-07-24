class Game < ApplicationRecord
  belongs_to :user
  has_many :teams
  validates :title, presence: { message: "Title cannot be empty" }
end
