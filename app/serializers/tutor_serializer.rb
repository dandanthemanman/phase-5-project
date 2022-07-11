class TutorSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :hourly_rate
end
