class UsersController < ApplicationController
    def me
        @user = login_user
        render "users/show"
    end
    def show
        id = params[:id]
        @user = User.find(id)
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
