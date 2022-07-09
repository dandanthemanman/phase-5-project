class UserTutor < ApplicationRecord
    belongs_to :user 
    belongs_to :tutor 
    # don't need validations
end
