class Api::MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    other_user_id = params[:other_user_id]
    messages = other_user_id ? current_user.all_chats_with_last_access_info(other_user_id)
                              : []
    render json: messages
  end

  def create
    message = current_user.send_messages.create(message_params)
    messages = message.valid? ? current_user.all_chats_with_last_access_info(message.to_user_id)
                                : []
    render json: messages
  end

  private
    def message_params
      # 画像アップロードの時にparamsがうまくネストになってくれない
      # とりあえず動作させるために.require(:message)を削除
      params.permit(:contents,:from_user_id,:to_user_id,
                    :timestamp,:picture)
    end
end
