module Api
  class FriendshipsController < ApplicationController
    before_action :authenticate_user!

    def create
      friendship = Friendship.create(friendship_params)
      @friends = current_user.friends
      render json: @friends
    end

    def destroy
      friendship =
        Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:id]) ||
        Friendship.find_by(from_user_id: params[:id], to_user_id: current_user.id)
      friendship.destroy if friendship
      @friends = current_user.friends
      render json: @friends
    end

    private
      def friendship_params
        params.require(:friendship).permit(:from_user_id, :to_user_id)
      end
  end
end
