class FolderTag < ApplicationRecord
    belongs_to :folder
    belongs_to :tag
end
