class SessionController < ApplicationController
    skip_before_action :authorize, only: [:create]
    
    # login --> used in loginform
    def create
        # find the user in the db via username
        user = User.find_by(username: params[:username])
        # check password
        if user&.authenticate(params[:password])
            # return user data
            byebug
            session[:user_id] = user.id
            byebug
            render json: user, status: :created
        else
            render json: { errors: "invalid username or password"}, status: 401
        end
    end

    # logout --> used in logout button for navbar
    def destroy 
        session.delete(:user_id)
        head :no_content
        byebug
    end
end
