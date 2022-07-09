class CreateUserTutors < ActiveRecord::Migration[6.1]
  def change
    create_table :user_tutors do |t|
      t.integer :user_id
      t.integer :tutor_id

      t.timestamps
    end
  end
end
