class CreateFolders < ActiveRecord::Migration[5.2]
  def change
    create_table :folders do |t|
      t.string :title
      t.string :caption
      t.belongs_to :user
      t.timestamps
    end
  end
end
