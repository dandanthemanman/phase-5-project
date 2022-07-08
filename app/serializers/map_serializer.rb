class MapSerializer < ActiveModel::Serializer
  attributes :id, :starting_point, :ending_point, :data
end
