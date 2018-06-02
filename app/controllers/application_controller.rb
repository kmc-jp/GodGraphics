class ApplicationController < ActionController::Base
    def remote_user
        ret = request.env["REMOTE_USER"] || request.env['HTTP_X_FORWARDED_USER']
        if ret == nil then
            "unknown_user"
        end
    end

    def login_user
        if remote_user then
            if User.exists?( :name => remote_user ) then
                User.find_by( :name => remote_user )
            else 
                user = User.create(
                     name: remote_user , 
                     display_name: remote_user 
                )
            end
        end
    end

    def index
    end
end
