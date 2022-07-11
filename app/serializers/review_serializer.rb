class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :review_body
end
