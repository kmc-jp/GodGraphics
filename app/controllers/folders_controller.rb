class FoldersController < ApplicationController
    def show
        id = params[:id]
        @folder = Folder.find(id)
        @graphics = @folder.graphics.all
    end
end
