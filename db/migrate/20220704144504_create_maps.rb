class CreateMaps < ActiveRecord::Migration[6.1]
  def change
    create_table :maps do |t|
      t.float :starting_point
      t.float :ending_point
      t.float :data

      t.timestamps
    end
  end
end
