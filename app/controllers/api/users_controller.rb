module Api
  class UsersController < ApplicationController
    def index
      serch_word = params[:serch_word]
      if serch_word.present?
        @serched_users = User.where('name LIKE ?', "%#{serch_word}%")
      else
        @serched_users = []
      end
      render json: @serched_users
    end
  end
end
