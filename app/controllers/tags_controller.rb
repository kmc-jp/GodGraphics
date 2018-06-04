class TagsController < ApplicationController
    def show
        id = params[:id]
        tag = Tag.includes(:folders).find(id)
        render :json => tag.as_json
    end
    def index
        render :json => Tag.all.order(updated_at: :desc).as_json
    end
end
