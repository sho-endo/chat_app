class RenameToToToUserId < ActiveRecord::Migration
  def change
    rename_column :messages, :to, :to_user_id
  end
end
