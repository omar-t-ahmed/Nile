# reviews = @reviews.includes(item.id)
items = @items.includes(:reviews)

items.each do |item|
  json.set! item.id do
    json.extract! item, :id, :name, :price
    json.photoUrl item.photo.attached? ? item.photo.url : nil
    json.reviews item.reviews
  end
end
