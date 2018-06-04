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
            attachments = []
            count = 0
            folder.images.each do |image|
                response = HTTP.post("https://upload.gyazo.com/api/upload", :params => {
                    access_token: ENV['GYAZO_TOKEN'],
                    title: folder.title
                },:form => {
                    :imagedata   => HTTP::FormData::File.new("./public/" + image.image[:small].url)
                })
                res = JSON.parse(response.body.to_s)
                if ( count == 0 )
                    attachments.push({
                        "author_name": user.display_name,
                        "title": folder.title,
                        "title_link": request.url + "/folders/" + folder.id.to_s,
                        "text": folder.caption,
                        "image_url": res['url'],
                        "footer": "God Graphics Uploader",
                        "ts": Time.now.to_i
                    });
                else 
                    attachments.push({
                        "text": folder.title + ' ' + (count+1).to_s,
                        "image_url": res['url'],
                    });
                    end
                count = count + 1
            end

            client = Slack::Web::Client.new
            client.chat_postMessage(
                channel: '#' + post_slack_channel,
                text: user.display_name + 'の新しい絵です！',
                as_user: false,
                username: 'God Graphics Uploader',
                icon_emoji: ':godicon:',
                attachments: attachments
            )
        end

    end

    def slack_channels
        client = Slack::Web::Client.new
        channels = client.channels_list.channels
        render :json => channels.map { |channel| channel.name }
    end
end
