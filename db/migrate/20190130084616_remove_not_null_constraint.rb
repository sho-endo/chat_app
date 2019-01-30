class RemoveNotNullConstraint < ActiveRecord::Migration
  def change
    change_column_null :messages, :contents, true
  end
end
