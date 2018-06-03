# coding: utf-8
require 'fileutils'

class UploadController < ApplicationController
    protect_from_forgery except: :post
    def index
    end
    def post
        post_folder(params)
        redirect_to "/"
    end
end
