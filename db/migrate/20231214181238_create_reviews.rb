class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :star_rating, null: false
      t.string :header
      t.text :body
      t.references :item, foreign_key: true,	null: false
      t.references :user, foreign_key: true, null: false
      t.timestamps
    end
  end
end
