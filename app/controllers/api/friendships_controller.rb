module Api
  class FriendshipsController < ApplicationController
    before_action :authenticate_user!

    def create
      Friendship.create(friendship_params)
      render json: current_user.friends
    end

    def destroy
      friendship =
        Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:id]) ||
        Friendship.find_by(from_user_id: params[:id], to_user_id: current_user.id)
      friendship.destroy if friendship
      render json: current_user.friends
    end

    private
      def friendship_params
        params.require(:friendship).permit(:from_user_id, :to_user_id)
      end
  end
end
