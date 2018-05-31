# coding: utf-8

class GraphicsController < ApplicationController
    def show
        id = params[:id]
        @graphic = Graphic.find(id)
    end
end
