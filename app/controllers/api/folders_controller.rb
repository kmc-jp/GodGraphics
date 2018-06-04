class Api::FoldersController < ApplicationController
    protect_from_forgery except: :destroy
    protect_from_forgery except: :update

    def index
        folders = Folder.order( id: :desc )
        render :json => folders.as_json
    end
    def show
        id = params[:id]
        folder = Folder.find(id)
        render :json => folder.as_json
    end
    def destroy
        id = params[:id]
        folder = Folder.find(id)
        if folder.user.id != login_user.id then
            return
        else
            Folder.find(id).destroy
        end
        render :json => { success: true }
    end
    def edit
        id = params[:id]
        @folder = Folder.find(id)
        if @folder.user.id != login_user.id then
            redirect_to "/"
        end
    end
    def update
        folder = post_folder(params)
        render :json => { id: folder.id }
    end
end