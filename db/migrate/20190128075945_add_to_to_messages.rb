class AddToToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :to, :integer
    change_column_null :messages, :to, false
  end
end
