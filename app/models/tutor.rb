class Tutor < ApplicationRecord
    has_many :user_tutors
    has_many :users, through: :user_tutors
    has_many :reviews 
    # don't need validation because tutors won't be created
end
