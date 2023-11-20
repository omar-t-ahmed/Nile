json.extract! @item, :id, :name, :price, :category, :body, :description, :item_specifications
json.photoUrl @item.photo.attached? ? @item.photo.url : nil