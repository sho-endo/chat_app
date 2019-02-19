class AddLatsAccessToFriendship < ActiveRecord::Migration
  def change
    add_column :friendships, :last_access_of_from_user, :integer, limit: 8
    add_column :friendships, :last_access_of_to_user, :integer, limit: 8
  end
end
