class Api::UsersController < ApplicationController
    protect_from_forgery except: :update

    def me
        render :json => login_user.as_json
    end
    def show
        id = params[:id]
        user = User.find(id)
        ret = {
            user: user.as_json,
            is_login_user: login_user.id == user.id
        }
        render :json => ret.as_json
    end
    def update
        id = params[:id]
        data = JSON.parse(request.body.read)
        display_name = data['display_name']
        user = User.find(id)
        user.update( display_name: display_name )
        render :json => {success: true}
    end
end
