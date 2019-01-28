class RenameFromToFromUserId < ActiveRecord::Migration
  def change
    rename_column :messages, :from, :from_user_id
  end
end
