# coding: utf-8
require 'fileutils'

class UploadController < ApplicationController
    protect_from_forgery except: :post
    def index
    end
    def post
        title = params[:title]
        caption = params[:caption]

        p title
        p caption

        user = User.find( 2 )

        folder = user.folders.create(title: title , caption: caption)

        params[:images].each do |graphic|
            folder.graphics.create(image: graphic)
        end

        redirect_to "/"
    end
end
