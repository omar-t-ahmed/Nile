class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name,	null: false
      t.float :price,	null: false
      t.string :category, null: false
      t.text :body
      t.text :description
      t.text :item_specifications

      t.timestamps
    end

    add_index :items, :name
    add_index :items, :category
  end
end
