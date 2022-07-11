class TutorSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :hourly_rate
  has_many :reviews
end
