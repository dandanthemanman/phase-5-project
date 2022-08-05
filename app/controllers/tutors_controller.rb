class TutorsController < ApplicationController

    def index 
        # this will return an array
        render json: Tutor.all
    end
end
