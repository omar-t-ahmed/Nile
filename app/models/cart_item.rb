class CartItem < ApplicationRecord
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :item,
        foreign_key: :item_id,
        class_name: :Item
end
