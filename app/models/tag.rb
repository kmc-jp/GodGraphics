class Tag < ApplicationRecord
    has_many :folder_tags
    has_many :folders, :through => :folder_tags

    def folder_num
        folders.count
    end

    def as_json(options =  {})
        super( :methods => [:folder_num] , :include => [:folders => {:methods => [:images]}] )
    end
end
