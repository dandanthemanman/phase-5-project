class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    # validates :username, uniqueness: true 
    has_many :user_tutors
    has_many :tutors, through: :user_tutors
    has_many :reviews
end
