class AddNotNullConstraint < ActiveRecord::Migration
  def change
    change_column_null :users, :name, false
    change_column_null :messages, :contents, false
    change_column_null :messages, :from, false
    change_column_null :friendships, :from_user_id, false
    change_column_null :friendships, :to_user_id, false
  end
end
