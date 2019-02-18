class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def serch
    serched_users = User.serch_by_word(params[:serch_word])
    render json: serched_users
  end

  def friends
    friends_with_last_message = current_user.get_info_of_friends_and_last_message
    render json: friends_with_last_message
  end

  def return_current_user
    render json: current_user
  end
end
