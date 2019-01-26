module Api
  class FriendshipsController < ApplicationController
    def create
      friendship = Friendship.create(friendship_params)
      @friends = current_user.friends
      render json: @friends
    end

    def destroy

    end

    private
      def friendship_params
        params.require(:friendship).permit(:from_user_id, :to_user_id)
      end
  end
end
