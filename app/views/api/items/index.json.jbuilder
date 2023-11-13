@items.each do |item|
  json.set! item.id do
    json.extract! item, :id, :name, :price, :category, :body, :description, :item_specifications
  end
end
