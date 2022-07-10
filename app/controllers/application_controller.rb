class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize 

  # authorization handler to check session id
  def authorize
    #  @current_user = User.find_by(id: session[:user_id])
    #         render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end


end
