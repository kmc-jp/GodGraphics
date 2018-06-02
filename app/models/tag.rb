class Tag < ApplicationRecord
    has_many :folder_tags
    has_many :tags, :through => :folder_tags
end
