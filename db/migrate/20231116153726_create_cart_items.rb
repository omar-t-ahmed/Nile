class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.references :item, foreign_key: true,	null: false
      t.references :user,foreign_key: true, null: false
      t.bigint :quantity, null: false
      
      t.timestamps
    end
  end
end
