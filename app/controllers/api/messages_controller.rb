module Api
  class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
      other_user_id = params[:other_user_id]
      @messages = other_user_id ? current_user.all_chats(other_user_id) : []
      render json: @messages
    end

    def create
      current_user.send_messages.create(message_params)
      other_user_id = params[:other_user_id]
      @messages = other_user_id ? current_user.all_chats(other_user_id) : []
      render json: @messages
    end

    private
      def message_params
        params.require(:message).permit(:contents, :from_user_id, :to_user_id, :timestamp)
      end
  end
end
