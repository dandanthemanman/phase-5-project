class AddImageToTutors < ActiveRecord::Migration[6.1]
  def change
    add_column :tutors, :image, :string
  end
end
