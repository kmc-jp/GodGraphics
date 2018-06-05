#coding: utf-8
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

    def post_folder(params)
        id = params[:id]
        title = params[:title]
        caption = params[:caption]
        tags = params[:tags]
        post_slack = params[:post_slack]
        post_slack_channel = params[:post_slack_channel]

        if id then
            folder = Folder.find(id)
            if login_user.id != folder.user_id then
                return 
            end
            user = folder.user
        end
        if folder == nil then
            user = login_user
            folder = user.folders.create
            params[:images].each do |image|
                folder.images.create(image: image)
            end
        end
        folder.update(title: title , caption: caption)

        folder_tags = []
        if tags then
            params[:tags].each do |tag|
                if Tag.exists?(:name => tag) then
                    folder_tags.push( Tag.find_by(:name => tag) )
                else
                    folder_tags.push( Tag.create(name: tag) )
                end
            end
        end 
        folder.tags = folder_tags

        if post_slack then
            image_urls = []
            gyazo = MyAssets::MyGyazo.new( ENV['GYAZO_TOKEN'] )
            slack = MyAssets::MySlack.new

            folder.images.each do |image|
                res = gyazo.post( folder.title , "./public/" + image.image[:medium].url )
                image_urls.push(res)
            end

            slack.post(
                channel: post_slack_channel,
                user: user,
                folder: folder,
                image_urls: image_urls,
                base_url: request.url #もうちょっとなんとかしたい
            )

         end
        return folder
    end
end
