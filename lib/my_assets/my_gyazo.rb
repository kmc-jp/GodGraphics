#coding: utf-8
module MyAssets
    class MyGyazo
        def initialize(token)
            @token = token
        end
        def post(title , url)
            response = HTTP.post("https://upload.gyazo.com/api/upload", :params => {
                access_token: @token,
                title: title
            },:form => {
                :imagedata   => HTTP::FormData::File.new(url)
            })
            res = JSON.parse(response.body.to_s)   
            res['url']
        end 
    end
end