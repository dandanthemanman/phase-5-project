class Tutor < ApplicationRecord
    has_many :user_tutors
    has_many :users, through: :user_tutors
    has_many :reviews 

    # tutor's overall rating
    def cumulativeRating
        return ((self.reviews.pluck(:rating).sum)/(self.reviews.count))
    end
end
