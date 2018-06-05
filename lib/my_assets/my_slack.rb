module MyAssets
    class MySlack
        def initialize
            @client = Slack::Web::Client.new
        end
        def post(channel: , user:, folder:, image_urls:,base_url:)

            attachments = []
            image_urls.each_with_index do |url,index| 
                if ( index == 0 )
                    attachments.push({
                        "author_name": user.display_name,
                        "title": folder.title,
                        "title_link": base_url + "/folders/" + folder.id.to_s,
                        "text": folder.caption,
                        "image_url": url,
                        "footer": "God Graphics Uploader",
                        "ts": Time.now.to_i
                    });
                else 
                    attachments.push({
                        "text": folder.title + ' ' + (index+1).to_s,
                        "image_url": url,
                    });
                end
            end

            @client.chat_postMessage(
                channel: '#' + channel,
                text: user.display_name + 'の新しい絵です！',
                as_user: false,
                username: 'God Graphics Uploader',
                icon_emoji: ':godicon:',
                attachments: attachments
            )

        end
    end
end