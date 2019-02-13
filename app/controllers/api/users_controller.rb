class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def serch
    serched_users = User.serch_by_word(params[:serch_word])
    render json: serched_users
  end

  def friends
    render json: current_user.friends
  end

  def return_current_user
    render json: current_user
  end
end
