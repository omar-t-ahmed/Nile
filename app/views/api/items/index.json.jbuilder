@items.each do |item|
  json.set! item.id do
    json.extract! item, :id, :name, :price
    json.photoUrl item.photo.attached? ? item.photo.url : nil
  end
end
