class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest
  has_many :tutors, through: :user_tutors
end
