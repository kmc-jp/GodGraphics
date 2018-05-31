class Graphic < ApplicationRecord
    include ImageUploader[:image]
    belongs_to :folder
end
