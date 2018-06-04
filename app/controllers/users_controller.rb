class UsersController < ApplicationController
    def me
        render :json => login_user.as_json
    end
    def show
        id = params[:id]
        render :json => User.find(id).as_json
    end
    def detail
        id = params[:id].to_i
        user = User.find(id)
        ret = {
            user: user.as_json,
            is_login_user: login_user.id == id
        }
        render :json => ret.as_json
    end
end
