class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    # validates :username, uniqueness: true 
    has_many :user_maps
    has_many :maps, through: :user_maps
end
