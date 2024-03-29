class ReviewsController < ApplicationController

    def create
        review = Review.create(review_params)
        render json: review
    end

    private 

    def review_params   
        params.permit(:user_id, :tutor_id, :review_body, :rating)
    end
end
