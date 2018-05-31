class ApplicationController < ActionController::Base
    def index
        @folders = Folder.all
    end
end
