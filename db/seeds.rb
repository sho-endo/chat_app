# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

(1..30).each do |i|
  User.create(
    name: (0...8).map{ ('a'..'z').to_a[rand(26)] }.join,
    email: "test#{i}@example.com",
    password: 'foobar'
    )
end

User.create(
  name: 'test',
  email: 'test@example.com',
  password: 'foobar'
  )
User.create(
  name: 'hoge',
  email: 'hogehoge@example.com',
  password: 'foobar'
)
User.create(
  name: 'test_user1',
  email: 'test_user1@example.com',
  password: 'foobar'
)
User.create(
  name: 'test_user2',
  email: 'test_user2@example.com',
  password: 'foobar'
)
