class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :messages
  has_many :student_lists

  # Validate email format using a custom validator
  validates :email, format: { with: /.+@education\.metro\.tokyo\.jp|.+@mail\.dnp\.co\.jp/,
                              message: "must be an email address from The Tokyo Board of Education" }
end
