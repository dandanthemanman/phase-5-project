class TutorSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :hourly_rate, :cumulativeRating
  has_many :reviews

  def cumulativeRating
    if self.object.reviews.count > 0 
    ((self.object.reviews.pluck(:rating).sum)/(self.object.reviews.count))
    end
  end
end
