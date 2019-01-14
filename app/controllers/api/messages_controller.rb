module Api
  class MessagesController < ApplicationController
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
        params.require(:message).permit(:contents, :from, :timestamp)
      end
  end
end
