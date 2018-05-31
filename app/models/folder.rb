class Folder < ApplicationRecord
    has_many :graphics, dependent: :destroy
    belongs_to :user
end
