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

  standMixer = Item.create(
  {
    name: "KitchenAid Professional Stand Mixer",
    price: 349.99,
    category: "Home and Kitchen",
    body: "Knead & shred at the next level with 2x the power in the bowl than Tilt-head stand mixer*; 3-point locking bowl for stability. *Compared to KSM150 when measuring peak HP in the bowl; above speed 2
    11 distinct speeds for power and control - from our powerful speed 10 to our most delicate 1/2 speed, this mixer has power and control from high to low, and everything in between.
    Designed for folding, 1/2 speed gently adds delicate ingredients, like blueberries and egg whites, into recipes without overbeating.
    With 7 quart capacity, you can easily mix 13 dozen cookies per batch*, knead over 8.5 lbs of bread, or mash over 7.5 lbs of potatoes. *Using the flat beater; 28g dough each.
    Double flex edge beater designed with a twist and two flexible edges to scrape the bowl, giving you thorough ingredient incorporation and better results.* *Compared to our flat beater",
    description: "The KitchenAid Professional Stand Mixer is a must-have for any home chef. Its durable construction and high-performance motor ensure reliable and efficient mixing. The mixer comes with a large capacity bowl, perfect for making multiple batches of your favorite recipes",
    item_specifications: "Product Dimensions: 17.3 x 13.3 x 19.3 inches, 26 Pounds;
                    Date First Available: July 1, 2022;
                    Manufacturer: KitchenAid Inc.;
                    ASIN: B09WXYZ5678;
                    Country of Origin: United States"
  })

  standMixer.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/stand-mixer.jpeg"), filename: "stand-mixer.png")

  catan = Item.create(
  {
    name: "Catan (Base Game) Adventure Board Game for Adults and Family | Ages 10+ | for 3 to 4 Players ",
    price: 27.49,
    category: "Toys and Games",
    body: "TRADE, BUILD AND SETTLE: Embark on a quest to settle the isle of Catan! Guide your settlers to victory by clever trading and cunning development. But beware! Someone might cut off your road or buy a monopoly. And you never know when the wily robber might steal some of your precious games!
    STRATEGY BOARD GAME: Use resource combinations - grain, wool, ore, brick and lumber - to buy handy development cards and build roads, settlements and cities. Acquire your resources through trades, cards or lucky dice (even outside your turn).
    MINUTES TO LEARN AND A LIFETIME TO EXPLORE: The basics of CATAN can be learned in just minutes, but it offers enough depth to remain compelling as you explore strategies and tactics for years to come. The random mix creates a different board virtually every game. No two games are the same.
    FUN FAMILY GAMES FOR GAME NIGHT: An international favorite, CATAN has been called the 'Perfect Social Game'. Check out our entire collection of CATAN board games for adults and kids to enjoy on family game night. Enjoy hours of fast-paced, interactive fun!
    NUMBER OF PLAYERS AND AVERAGE PLAYTIME: This fun family game is designed for 3 to 4 players and is suitable for ages 10 and older. Average playtime is approximately 60 minutes",
    description: "Your adventurous settlers seek to tame the remote but rich isle of Catan. Start by revealing Catan’s many harbors and regions: Pastures, fields, mountains, hills, forests, and desert. The random mix creates a different board virtually every game. Skills - Clever trading, strategy, tactical skill, luck. Type of Game: War games. To play with 5–6 players, the 5–6 player extension is required..",
    item_specifications: "Package Dimensions: 	11.8 x 9.5 x 3.3 inches, 2 Pounds;
                        Date First Available: August 5, 2022;
                        Manufacturer: 	Catan Studio;
                        ASIN: B00U26V4VQ;
                        Country of Origin: China"
  })

  catan.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/catan.webp"), filename: "catan.png")

  dune = Item.create(
  {
    name: "Dune (Penguin Galaxy) Hardcover – October 25, 2016",
    price: 20.99,
    category: "Books",
    body: "NOW A MAJOR MOTION PICTURE directed by Denis Villeneuve and starring Timothée Chalamet, Zendaya, Jason Momoa, Rebecca Ferguson, Oscar Isaac, Josh Brolin, Stellan Skarsgård, Dave Bautista, Stephen McKinley Henderson, Chang Chen, Charlotte Rampling, and Javier Bardem. 
    A deluxe hardcover edition of the best-selling science-fiction book of all time—part of Penguin Galaxy, a collectible series of six sci-fi/fantasy classics, featuring a series introduction by Neil Gaiman.
    Winner of the AIGA + Design Observer 50 Books | 50 Covers competition",
    description: "Science fiction’s supreme masterpiece, Dune will be forever considered a triumph of the imagination. Set on the desert planet Arrakis, it is the story of the boy Paul Atreides, who will become the mysterious man known as Muad’Dib. Paul’s noble family is named stewards of Arrakis, whose sands are the only source of a powerful drug called “the spice.” After his family is brought down in a traitorous plot, Paul must go undercover to seek revenge, and to bring to fruition humankind’s most ancient and unattainable dream. A stunning blend of adventure and mysticism, environmentalism and politics, Dune won the first Nebula Award, shared the Hugo Award, and formed the basis of what is undoubtedly the grandest epic in science fiction.",
    item_specifications: "Dimensions : 8.5 x 5.43 x 1.68 inches, 1.25 pounds;
                        Hardcover:  720 pages;
                        Publisher:  Penguin Classics; Reprint edition (October 25, 2016);
                        Language: English;
                        ISBN-13: 978-1-234567-89-0;
                        Publication Date: September 15, 2022"
  })
  
  dune.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/dune.jpg"), filename: "dune.png")

  puts "Done!"
# end