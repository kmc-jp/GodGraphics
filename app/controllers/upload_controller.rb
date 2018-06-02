# coding: utf-8
require 'fileutils'

class UploadController < ApplicationController
    protect_from_forgery except: :post
    def index
    end
    def post
        title = params[:title]
        caption = params[:caption]
        tags = params[:tags]
        p tags

        user = login_user
        folder = user.folders.create(title: title , caption: caption)

        params[:images].each do |image|
            folder.images.create(image: image)
        end

        if tags then
            folder_tags = []
            params[:tags].each do |tag|
                if Tag.exists?(:name => tag) then
                    folder_tags.push( Tag.find_by(:name => tag) )
                else
                    folder_tags.push( Tag.create(name: tag) )
                end
            end
            folder.tags = folder_tags
        end 
        redirect_to "/"
    end
end
