class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.text :image_data
      t.belongs_to :folder, index: true
      t.timestamps
    end
  end
end
