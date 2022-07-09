# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
require 'betterlorem'


puts "starting seeding..."

User.destroy_all
User_tutor.destroy_all
Tutor.destroy_all
Review.destroy_all


20.times do 
Tutor.create(
    name: Faker::Name.name
    description: BetterLorem.p(1, true, true),
    hourly_rate: rand(15 ..75)
 )
end

500.times do
    Review.create(
        review_body: 
        rating: 
    )
end



puts "done seeding!"