# Chat App
Ruby on Railsと Reactを使用した、メッセンジャーライクなチャットアプリです。

## デモ

https://react-rails-chat.herokuapp.com

* デモアカウント

```
①
メールアドレス: test_user1@example.com
パスワード: foobar

②
メールアドレス: test_user2@example.com
パスワード: foobar
```

## 実装した主な機能
ある企業様の採用課題として作成しました（アプリの雛形を渡され、そこに指定された機能を実装する方式）  
自力で実装した機能は以下の通りです。

* Reactで構成されたフロントとRailsで構成されたAPIの接続
  * SuperAgentを使用
* deviseを用いたユーザー認証機能
* ユーザー検索機能
* 友達機能
  * 多対多のDBテーブルのリレーション管理
* １対１のチャット機能
  * 投稿時間表示, 既読機能も実装
* 画像投稿機能
  * carrierwave, mini_magickを使用
* herokuでのデプロイ

## バージョン
* ruby 2.5.1
* rails 4.2.8
* react 0.14.5
* node 8.5.0
* npm 6.4.1

## アプリケーションのセットアップ
```sh
$ bundle install
$ npm install
$ bundle exec rake db:create
$ bundle exec rake db:migarte
$ bundle exec rails s
```
