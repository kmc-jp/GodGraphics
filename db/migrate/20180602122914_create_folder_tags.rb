class CreateFolderTags < ActiveRecord::Migration[5.2]
  def change
    create_table :folder_tags do |t|
      t.references :folder, index: true,null: false
      t.references :tag, index: true,null: false
      t.timestamps
    end
  end
end
