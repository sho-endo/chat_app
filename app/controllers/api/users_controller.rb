module Api
  class UsersController < ApplicationController
    def index
      # とりあえず今は全ユーザー返してる
      # 検索ワードに応じて返すように修正
      # params[:serch_word]で文字列取得できてる
      puts '==========================='
      puts params[:serch_word]
      puts '==========================='
      @users = User.all
      render json: @users
    end
  end
end
