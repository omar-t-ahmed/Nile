# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
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

  20.times do 
    dellInspiron = Item.create(
    {
      name: "Dell Inspiron 15 5000 Series Laptop",
      price: 799.99,
      category: "Electronics",
      body: "Experience powerful performance with the Dell Inspiron 15 5000 Series Laptop. Equipped with the latest Intel Core processor, this laptop delivers seamless multitasking and responsive computing. The sleek design and vibrant 15.6-inch display makes it perfect for work or entertainment on the go",
      description: "The Dell Inspiron 15 5000 Series Laptop is packed with features to enhance your computing experience. Enjoy stunning visuals and vibrant colors on the 15.6-inch Full HD display. The laptop also comes with a backlit keyboard for comfortable typing in any lighting conditions.",
      item_specifications: "Product Dimensions: 14.96 x 10.16 x 0.89 inches 4.41 Pounds;
                      Date First Available: June 15, 2022;
                      Manufacturer: Dell Inc.;
                      ASIN: B09XYZ1234;
                      Country of Origin: China"
    })
  end

  puts "Done!"
end