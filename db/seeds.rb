require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Item.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    name: 'demo',
    email: 'demo@user.io', 
    password: 'demopassword'
  )


  dellInspiron = Item.create(
    {
      name: "Dell Inspiron 15 5000 Series Laptop",
      price: 799.99,
      category: "Electronics",
      body: "Experience powerful performance with the Dell Inspiron 15 5000 Series Laptop. Equipped with the latest Intel Core processor, this laptop delivers seamless multitasking and responsive computing. The sleek design and vibrant 15.6-inch display makes it perfect for work or entertainment on the go",
      description: "The Dell Inspiron 15 5000 Series Laptop is packed with features to enhance your computing experience. Enjoy stunning visuals and vibrant colors on the 15.6-inch Full HD display. The laptop also comes with a backlit keyboard for comfortable typing in any lighting conditions.",
      item_specifications: "Product Dimensions: 14.96 x 10.16 x 0.89 inches, 4.41 Pounds;
                      Date First Available: June 15, 2022;
                      Manufacturer: Dell Inc.;
                      ASIN: B09XYZ1234;
                      Country of Origin: China"
    })

    dellInspiron.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/dell-laptop(1).webp"), filename: "dell-laptop.png")

  #   kitchenAppliance = Item.create(
  # {
  #   name: "KitchenAid Professional Stand Mixer",
  #   price: 349.99,
  #   category: "Home and Kitchen",
  #   body: "Enhance your culinary skills with the KitchenAid Professional Stand Mixer. This powerful and versatile stand mixer is designed to handle a variety of tasks in the kitchen. With a robust motor and various attachments, it makes baking and cooking a breeze.",
  #   description: "The KitchenAid Professional Stand Mixer is a must-have for any home chef. Its durable construction and high-performance motor ensure reliable and efficient mixing. The mixer comes with a large capacity bowl, perfect for making multiple batches of your favorite recipes.",
  #   item_specifications: "Product Dimensions: 17.3 x 13.3 x 19.3 inches, 26 Pounds;
  #                   Date First Available: July 1, 2022;
  #                   Manufacturer: KitchenAid Inc.;
  #                   ASIN: B09WXYZ5678;
  #                   Country of Origin: United States"
  # })

  # kitchenAppliance.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/stand-mixer.jpeg"), filename: "stand-mixer.png")

  puts "Done!"
# end