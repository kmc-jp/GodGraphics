class Image < ApplicationRecord
    include ImageUploader[:image]
    belongs_to :folder

    def url
        ret = {
            "original": image[:original].url,
            "large": image[:large].url,
            "medium": image[:medium].url,
            "small": image[:small].url
        };
        return ret
    end

    def path
        image[:original].url
    end

    def as_json(options = {})
        super(:methods => [:url,:path])
    end
end
