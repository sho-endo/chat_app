module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def serch
      serch_word = params[:serch_word]
      if serch_word.present?
        @serched_users = User.where('name LIKE ?', "%#{serch_word}%")
      else
        @serched_users = []
      end
      render json: @serched_users
    end

    def friends
      @friends = current_user.friends
      render json: @friends
    end

    def current
      render json: current_user
    end
  end
end
