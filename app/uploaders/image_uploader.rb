require "image_processing/mini_magick"

class ImageUploader < Shrine
    plugin :processing
    plugin :versions
    plugin :delete_raw

    process(:store) do |io, context|
        original = io.download
        pipeline = ImageProcessing::MiniMagick.source(original)

        large = pipeline.resize_to_limit!( 800,800 )
        medium = pipeline.resize_to_limit!( 500,500 )
        small = pipeline.resize_to_limit!( 100,100 )
        
        original.close!

        { original: io, large: large, medium: medium, small: small }
    end
end