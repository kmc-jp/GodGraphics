# coding: utf-8
require 'fileutils'

class Api::UploadController < ApplicationController
    protect_from_forgery except: :post
    def post
        folder = post_folder(params)
        render :json => {id:folder.id}
    end

    def slack_channels
        client = Slack::Web::Client.new
        channels = client.channels_list.channels
        render :json => channels.map { |channel| channel.name }
    end
end
