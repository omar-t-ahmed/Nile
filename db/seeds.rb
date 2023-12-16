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
  demo_user = User.create!(
    name: 'demo',
    email: 'demo@user.io', 
    password: 'demopassword'
  )

  geforceRtx3060 = Item.create(
    {
      name: "NVIDIA GeForce RTX 3060",
      price: 299.99,
      category: "Electronics",
      body: "The NVIDIA GeForce RTX 3060 is powered by Ampere—NVIDIA's 2nd gen RTX architecture. Built with enhanced RT Cores and Tensor Cores, new streaming multiprocessors, and high-speed G6 memory, it gives you the power you need to rip through the most demanding games. VENTUS brings a performance-focused design that maintains the essentials to accomplish any task at hand. Rocking a trusted dual fan arrangement laid into a rigid industrial design lets this sharp looking graphics card fit into any build. TORX Fan 3: The award-winning MSI TORX Fan 3 design creates high static pressure and pushes the limits of thermal performance. Core Pipe: Precision-crafted heat pipes ensure max contact to the GPU and spread heat along the full length of the heatsink",
      description: "Immerse yourself in the world of gaming with the NVIDIA GeForce RTX 3060. This high-performance graphics card is designed to take your gaming experience to the next level, delivering realistic visuals and unparalleled performance.",
      item_specifications: "Graphics Memory Size: 12 GB GDDR6;
                          Core Clock: 1320 MHz;
                          CUDA Cores: 3584;
                          Ray Tracing Cores: 28;
                          Tensor Cores: 112;
                          Memory Interface: 192-bit;
                          Outputs: 1x HDMI, 3x DisplayPort;
                          DirectX Support: 12.1;
                          Ray Tracing: Yes;
                          NVIDIA DLSS: Yes"
    }
  )

  geforceRtx3060.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/geforce-rtx.jpg"), filename: "geforceRtx3060.png")

  ryzen5700g = Item.create(
  {
    name: "AMD Ryzen 7 5700G 8-Core, 16-Thread",
    price: 359.99,
    category: "Electronics",
    body: "POWERFUL PROCESSING: The AMD Ryzen 7 5700G processor combines 8 cores and 16 threads for exceptional multitasking and processing power. Play some of the most popular games at 1080p with the fastest processor graphics in the world, no graphics card required
    8 Cores and 16 processing threads, bundled with the AMD Wraith Stealth cooler
    4.6 GHz Max Boost, unlocked for overclocking, 20 MB cache, DDR4-3200 support
    For the advanced Socket AM4 platform. Maximum Operating Temperature (Tjmax)-95°C. Unlock new possibilities for work and play",
    description: "For gamers, creators, and all-around PC users who want enthusiast-class performance without the need for a discrete graphics card – look no further than Ryzen™ 5000 G-Series Desktop Processors – The Ultimate Desktop Processor with Graphics. This unlocked processor not only delivers high-speed processing but also comes equipped with Radeon graphics for smooth visuals in gaming and content creation.",
    item_specifications: "Processor Cores: 8;
                        Threads: 16;
                        Base Clock: 3.8 GHz;
                        Max Boost Clock: 4.6 GHz;
                        Radeon Graphics: Yes;
                        Graphics Cores: 8;
                        Cache: 16MB L3 Cache;
                        TDP: 65W;
                        Socket: AM4;
                        PCIe Version: PCIe 3.0;
                        Integrated Graphics: AMD Radeon RX Vega Graphics"
  }
  )

  ryzen5700g.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/ryzen-5700.jpg"), filename: "ryzen5700gp.png")

  vengeanceRgbPro = Item.create(
    {
      name: "Corsair VENGEANCE RGB PRO DDR4 32GB",
      price: 79.99,
      category: "Electronics",
      body: "High performance DDR4 memory illuminates your system with vivid, animated lighting from ten ultra-bright, individually addressable RGB LEDs per module.
      Take control with CORSAIR iCUE software and synchronize lighting across all your CORSAIR iCUE compatible products, including memory, fans, coolers, keyboards and more.
      Customize lighting profiles with millions of different patterns and colors, or create your own in CORSAIR iCUE software.
      Compatible with Intel and AMD DDR4 motherboards.
      Requires no extra wires or cables for a clean and seamless install.
      Custom performance PCB for the highest signal quality and performance stability.
      Carefully screened ICs for extended overclocking potential",
      description: "Upgrade your system with Corsair VENGEANCE RGB PRO DDR4 memory. Featuring vibrant RGB lighting and high-speed performance, this 32GB kit is designed for enthusiasts who demand both style and substance in their gaming rig.",
      item_specifications: "Capacity: 32GB (2 x 16GB);
                          Type: DDR4;
                          Speed: 3200MHz;
                          CAS Latency: 16;
                          Voltage: 1.35V;
                          RGB Lighting: Yes (Customizable);
                          Form Factor: DIMM 288-pin;
                          Compatibility: Intel 100 Series, Intel 200 Series, Intel 300 Series, Intel X299, AMD 300 Series, AMD 400 Series, AMD X570;
                          Heat Spreader: Anodized Aluminum"
    }
  )

  vengeanceRgbPro.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/vengeance-pro.jpg"), filename: "vengeanceRgbPro.png")

  asusROG = Item.create(
  {
    name: "ASUS ROG Strix B550-XE Gaming WiFi AMD AM4",
    price: 229.99,
    category: "Electronics",
    body: "AMD AM4 Socket and PCIe 4. 0: The perfect pairing for Zen 3 Ryzen 5000 & 3rd Gen AMD Ryzen CPUs.Audio: Supports up to 32-Bit/192kHz playback
    Robust Power Design: 12plus2 DrMOS power stages with high-quality alloy chokes and durable capacitors provide reliable power for the last AMD high-count-core CPUs
    Optimized Thermal Solution: Fanless VRM and chipset heatsinks with ASUS Stack Cool 3plus design keep your system running reliably under heavy load by enhancing passive cooling capacity for critical onboard components.
    High-performance Gaming Networking: 2. 5 Gb LAN with ASUS LANGuard
    Best Gaming Connectivity: Supports HDMI 2. 1(4Kat60HZ) and DisplayPort 1. 2 output, featuring dual M. 2 slots (NVMe SSD)—one with PCIe 4. 0 x4 connectivity, USB 3. 2 Gen 2 Type-C port and Thunderbolt 3 header",
    description: "Elevate your gaming rig with the ASUS ROG Strix B550-XE Gaming WiFi motherboard. Featuring a powerful AMD AM4 socket, robust power delivery, and advanced cooling solutions, this motherboard is ready to handle the demands of modern gaming and content creation.",
    item_specifications: "Socket Type: AMD AM4;
                        Chipset: AMD B550;
                        Form Factor: ATX;
                        Memory Support: Up to 128GB DDR4 (4 slots);
                        PCIe Slots: 2 x PCIe 4.0 x16, 3 x PCIe 3.0 x1;
                        SATA Ports: 6 x SATA 6Gb/s;
                        M.2 Slots: 2 x M.2;
                        USB Ports: 1 x USB 3.2 Gen 2 Type-C, 1 x USB 3.2 Gen 2 Type-A, 2 x USB 3.2 Gen 1, 4 x USB 2.0;
                        Networking: WiFi 6 (802.11ax), 2.5Gb Ethernet;
                        Audio: SupremeFX S1220A 7.1-Channel HD Audio;
                        RGB Lighting: Yes (Aura Sync);
                        BIOS: UEFI AMI BIOS"
  }
  )

  asusROG.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/asus-rog.jpg"), filename: "asusROG.png")

  g502Hero = Item.create(
  {
    name: "Logitech G502 HERO High Performance Gaming Mouse",
    price: 79.99,
    category: "Electronics",
    body: "PRECISION GAMING MOUSE: The Logitech G502 HERO is designed for high-performance gaming, offering precise control, customizable features, and a comfortable design for extended gaming sessions.",
    description: "Take your gaming to the next level with the Logitech G502 HERO gaming mouse. Featuring the HERO sensor for accurate tracking, customizable RGB lighting, and a tunable weight system, this mouse is a versatile choice for gamers seeking precision and comfort.",
    item_specifications: "Sensor: HERO 25K Optical Sensor;
                        DPI Range: 100 - 25,600 DPI;
                        Programmable Buttons: 11;
                        Adjustable Weight: Yes (5 x 3.6g weights included);
                        Lighting: RGB, customizable with Logitech G HUB software;
                        Onboard Memory: Yes;
                        Durability: 50 million clicks;
                        Compatibility: Windows 7 or later, macOS 10.11 or later, Chrome OS;
                        Cable Length: 2.1m (6.9ft);
                        Dimensions: 132 x 75 x 40 mm;
                        Weight: 121g (mouse only)"
  }
  )

  g502Hero.photo.attach(io: URI.open("https://nile21-seeds.s3.amazonaws.com/g502-hero.jpg"), filename: "g502Hero.png")

  dellInspiron = Item.create(
    {
      name: "Dell Inspiron 15 5000 Series Laptop",
      price: 599.99,
      category: "Electronics",
      body: "[Screen] 15.6” Full HD (1920x1080), Anti-Glare, LED-Backlit, Narrow Border WVA Display. Provides immersive visual experience, superior image quality, razor-sharp resolution, and wide-viewing angle.
      [Processor] 10th Generation Intel Core i7-1065G7 Processor (8 MB Cache, up to 3.9 GHz). Intel latest Generation Processor with 10 nm Technology. Enable faster and cooler operation when performing business and daily computer tasks: document creation, internet browsing, and watching videos.
      [Memory and Hard Drive] 8GB 2666MHz DDR4 RAM for Multitasking. 512GB SSD with faster data reading/writing speed than HDD. Improves your experience with faster boot up, cooler operation and less drain on battery.
      [Ports and Battery] 1x USB 2.0, 1x HDMI, 2x USB 3.1, 1x Headphone/Microphone Combo Jack, 1x RJ45 Port, 1x SD Card Reader, 1x Wedge Shaped Lock Slot. 3-Cell/42 Wh Li-ion Battery.
      [Dimensions and Weight] 14.33 x 9.80 x0.78; Weight: 4.03 lbs. BesTry accessory bundle includes High Speed HDMI, USB Extension Cable, and Mouse Pad",
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
    price: 249.99,
    category: "Home and Kitchen",
    body: "Knead & shred at the next level with 2x the power in the bowl than Tilt-head stand mixer*; 3-point locking bowl for stability. *Compared to KSM150 when measuring peak HP in the bowl; above speed 2
    11 distinct speeds for power and control - from our powerful speed 10 to our most delicate 1/2 speed, this mixer has power and control from high to low, and everything in between.
    Designed for folding, 1/2 speed gently adds delicate ingredients, like blueberries and egg whites, into recipes without overbeating.
    With 7 quart capacity, you can easily mix 13 dozen cookies per batch*, knead over 8.5 lbs of bread, or mash over 7 lbs of potatoes. *Using the flat beater; 28g dough each.
    Double flex edge beater designed with a twist and two flexible edges to scrape the bowl, giving you thorough ingredient incorporation and better results",
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
    name: "Catan (Base Game) Adventure Board Game for Adults and Family",
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

  Review.create!(star_rating: 5, header: 'Excellent product', body: 'I love this item!', item: dellInspiron, user: demo_user)

  puts "Done!"
# end