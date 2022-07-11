class UserTutorsController < ApplicationController

    def create 
        user_tutor = UserTutor.create(userTutorParams)
        render json: user_tutor, status: :created
    end

    def destroy 
        byebug
        # user_tutor= UserTutor.find_by(id: params[id])
        # user_tutor.destroy
    end

    private

    def userTutorParams
        params.permit(:user_id, :tutor_id)
    end
end
