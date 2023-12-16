@reviews.each do |review|
    json.set! review.id do 
        json.extract! review, :id, :star_rating, :header, :body, :user_id, :item_id
    end
end