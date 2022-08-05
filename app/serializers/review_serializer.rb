class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :tutor_id, :rating, :review_body, :tutor
  belongs_to :tutor

  def cumulativeRating
    if self.object.reviews.count > 0 
    ((self.object.reviews.pluck(:rating).sum)/(self.object.reviews.count))
    end
  end

end
