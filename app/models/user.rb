class User < ApplicationRecord
    has_many :folders, dependent: :destroy
end
