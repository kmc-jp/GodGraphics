class TagsController < ApplicationController
    def show
        name = params[:name]
        @tag = Tag.find_by(:name => name)
    end
    def all
        render :json => Tag.all.order(updated_at: :desc).as_json
    end
    def folders
        id = params[:id]
        tag = Tag.includes(:folders).find( id )
        render :json => tag.folders.as_json
    end
end
