class AddNullFalseToReview < ActiveRecord::Migration[7.0]
  def change
    change_column_null :reviews, :header, false
    change_column_null :reviews, :body, false
  end
end
