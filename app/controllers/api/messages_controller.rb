module Api
  class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
      render json: Message.all
    end

    def create
      Message.create(message_params)
      render json: Message.all
    end

    private
      def message_params
        params.require(:message).permit(:contents, :from_user_id, :to_user_id, :timestamp)
      end
  end
end
