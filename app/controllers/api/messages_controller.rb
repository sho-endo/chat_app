module Api
  class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = Message.new(message_params)
      if @message.save
        render json: @message
      end
    end

    private
      def message_params
        params.require(:message).permit(:contents, :from_user_id, :to_user_id, :timestamp)
      end
  end
end
