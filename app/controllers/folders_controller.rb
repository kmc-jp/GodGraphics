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
        folder = Folder.find(id).destoy
        if folder.user.id != login_user.id then
            return
        else
            Folder.find(id).destroy
        end
    end
    def edit
        id = params[:id]
        @folder = Folder.find(id)
        if @folder.user.id != login_user.id then
            redirect_to "/"
        end
    end
    def update
        post_folder(params)
        redirect_to "/folders/%d" % params[:id]
    end
end