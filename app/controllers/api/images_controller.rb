# coding: utf-8

class Api::ImagesController < ApplicationController
    def show
        id = params[:id]
        @image = Image.find(id)
    end
end
