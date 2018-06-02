class Folder < ApplicationRecord
    has_many :images, dependent: :destroy
    belongs_to :user
    has_many :folder_tags
    has_many :tags, :through => :folder_tags
    
    def path
        "/folders/%d" % id 
    end

    def edit_path
        "/folders/%d/edit" % id 
    end

    def as_json(options = {})
        super( :methods => [:images,:tags,:path,:edit_path] , :include =>[ :user =>{ :methods => [:path]} ] )
    end    
end
