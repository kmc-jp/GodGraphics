class FoldersController < ApplicationController
    protect_from_forgery except: :destroy
    protect_from_forgery except: :update

    def show
        id = params[:id]
        @path = "./%d/detail" % id
    end
    def summary
        folders = Folder.order( id: :desc )
        render :json => folders.as_json
    end
    def detail
        id = params[:id]
        folder = Folder.find(id)
        render :json => folder.as_json
    end
    def destroy
        id = params[:id]
        Folder.find(id).destroy
    end
    def edit
        id = params[:id]
        @folder = Folder.find(id)
    end
    def update
        id = params[:id]
        title = params[:title]
        caption = params[:caption]
        tags = params[:tags]

        folder = Folder.find(id)
        folder.update(title: title , caption: caption)

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

        folder.save

        redirect_to "/folders/%d" % id
    end
end