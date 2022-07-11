require 'faker';

puts "starting seeding..."

User.destroy_all
UserTutor.destroy_all
Tutor.destroy_all
Review.destroy_all

# only need seed data for tutors and reviews


20.times do 
Tutor.create(
    name: Faker::Name.name,
    description: Faker::Lorem.paragraph(sentence_count: 4),
    hourly_rate: rand(15 ..75)
 )
end

User.create(
    username: "dan",
    password: "dan"
)

50.times do
    Review.create(
        review_body: Faker::Lorem.paragraph(sentence_count: 3),
        rating: rand(1..5),
        # tutor_id
        tutor_id: Tutor.ids.sample,
        # user_id
        user_id: 1
    )
end

5.times do 
    UserTutor.create(
        user_id: User.first.id,
        tutor_id: Tutor.ids.sample
    )
end

puts "seeding complete √"