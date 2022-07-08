class Map < ApplicationRecord
    has_many :user_maps
    has_many: users, through: :user_maps
end
