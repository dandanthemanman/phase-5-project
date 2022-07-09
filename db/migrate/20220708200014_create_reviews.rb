class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :user_id
      t.integer :tutor_id
      t.string :review_body
      t.float :rating

      t.timestamps
    end
  end
end
