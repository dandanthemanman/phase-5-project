class Review < ApplicationRecord
    belongs_to :user
    belongs_to :tutor
    # can add validations 
end
