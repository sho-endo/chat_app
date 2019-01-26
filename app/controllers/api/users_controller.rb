module Api
  class UsersController < ApplicationController
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
  end
end
