class Game < ApplicationRecord
  belongs_to :user
  has_many :teams, dependent: :destroy
  validates :title, presence: { message: "Title cannot be empty" }
end
