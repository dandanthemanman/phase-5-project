class UsersController < ApplicationController
# error handler for bad input from signup
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
    # authorization handler exception
    skip_before_action :authorize, only: :create

    # signup --> used in signup form
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created 
    end

    # auto login --> used in useeffect in app.js
    def show
        user = User.find_by(id: session[:user_id]) 
        render json: user, status: :created
    end


    private 

    # permitted params for signup
    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    # error handler for bad input for signup
    def unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages}, status: 422
    end
end
