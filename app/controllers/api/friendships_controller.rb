class Api::FriendshipsController < ApplicationController
  before_action :authenticate_user!

  def create
    Friendship.create(friendship_params)
    render json: current_user.friends
  end

  def destroy
    friendship = Friendship.find_friendship_by_id(current_user.id, params[:id])
    friendship.destroy if friendship
    render json: current_user.friends
  end

  private
    def friendship_params
      params.require(:friendship).permit(:from_user_id, :to_user_id)
    end
end
