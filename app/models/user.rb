class User < ApplicationRecord
    has_many :folders, dependent: :destroy

    def path
        "/users/%d" % id
    end

    def post_num
        folders.count
    end

    def as_json(options = {})
       super( :methods => [:folders,:path,:post_num] ) 
    end
end
