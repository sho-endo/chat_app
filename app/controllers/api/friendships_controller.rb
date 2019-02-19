class Api::FriendshipsController < ApplicationController
  before_action :authenticate_user!

  def create
    Friendship.create(friendship_params)
    render json: current_user.friends
  end

  def destroy
    friendship = Friendship.find_friendship_by_ids(current_user.id, params[:id])
    friendship.destroy if friendship
    render json: current_user.friends
  end

  def update_last_access
    friendship = Friendship.find_friendship_by_ids(current_user.id, params[:to_user_id])
    friendship.set_last_access(current_user.id)
    render json: current_user.all_chats_with_last_access_info(params[:to_user_id])
  end

  private
    def friendship_params
      params
        .require(:friendship)
        .permit(:from_user_id,
                :to_user_id,
                :last_access_of_from_user,
                :last_access_of_to_user)
    end
end
