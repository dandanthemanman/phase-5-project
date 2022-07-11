class TutorsController < ApplicationController

    def index 
        render json: Tutor.all
    end
end
