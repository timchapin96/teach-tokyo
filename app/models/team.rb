class Team < ApplicationRecord
  belongs_to :Game
  validates :color, presence: { message: "Team color must be selected."}
end
