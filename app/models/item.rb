class Item < ApplicationRecord
    has_many :cart_instances,
        foreign_key: :item_id,
        class_name: :CartItem,
        dependent: :destroy

    has_one_attached :photo
end
