const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Experience = require('../models/experience');
const Slot = require('../models/slots');
const Promo = require('../models/promo');
const Booking = require('../models/booking');

// Load env vars
dotenv.config();

// Sample data
const experiences = [
  {
    title: "Northern Lights Adventure",
    description: "Experience the magical Northern Lights in the Arctic wilderness. Our expert guides will take you to the best viewing spots away from city lights. Includes hot drinks and professional photography tips.",
    shortDescription: "Chase the magical Aurora Borealis in the Arctic wilderness",
    images: [
      "https://images.unsplash.com/photo-1579033462043-0f11a7862f7d?w=500",
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=500",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=500"
    ],
    price: 12923,
    originalPrice: 149,
    location: "Tromsø, Norway",
    rating: 4.8,
    reviewCount: 127,
    duration: "4 hours",
    category: "Adventure",
    included: [
      "Expert guide",
      "Hot drinks & snacks",
      "Professional photos",
      "Winter clothing",
      "Hotel pickup/dropoff"
    ],
    requirements: [
      "Warm clothing",
      "Good physical condition",
      "Camera (optional)"
    ],
    host: {
      name: "Arctic Adventures",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 4.9
    },
    maxParticipants: 12,
    isActive: true
  },
  {
    title: "Wine Tasting Tour",
    description: "Discover the finest local wines with our expert sommelier. Visit three boutique wineries, learn about wine production, and enjoy cheese pairings in a beautiful vineyard setting.",
    shortDescription: "Discover fine wines with expert sommeliers in scenic vineyards",
    images: [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500",
      "https://images.unsplash.com/photo-1474722883778-792e799030e3?w=500",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500"
    ],
    price: 8900,
    originalPrice: 99,
    location: "Napa Valley, California",
    rating: 4.6,
    reviewCount: 89,
    duration: "5 hours",
    category: "Food & Drink",
    included: [
      "Wine tasting at 3 wineries",
      "Expert sommelier",
      "Cheese pairings",
      "Transportation",
      "Vineyard tour"
    ],
    requirements: [
      "Age 21+",
      "Comfortable shoes"
    ],
    host: {
      name: "Vineyard Tours Co.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 4.7
    },
    maxParticipants: 15,
    isActive: true
  },
  {
    title: "Historic City Walking Tour",
    description: "Explore the rich history of our ancient city with a knowledgeable local guide. Visit historic landmarks, hidden gems, and learn fascinating stories from the past.",
    shortDescription: "Explore ancient history with expert local guides",
    images: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=500",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=500",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500"
    ],
    price: 45000,
    location: "Rome, Italy",
    rating: 4.7,
    reviewCount: 203,
    duration: "3 hours",
    category: "Cultural",
    included: [
      "Expert local guide",
      "Historic sites entry",
      "Map & guidebook",
      "Bottled water"
    ],
    requirements: [
      "Comfortable walking shoes",
      "Weather-appropriate clothing"
    ],
    host: {
      name: "History Walks",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 4.8
    },
    maxParticipants: 20,
    isActive: true
  },
  {
    title: "Sunset Sailing Experience",
    description: "Enjoy a breathtaking sunset cruise on a luxury sailboat. Includes champagne, appetizers, and stunning coastal views. Perfect for couples and special occasions.",
    shortDescription: "Luxury sailing at sunset with champagne and coastal views",
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500",
      "https://images.unsplash.com/photo-1469362102473-8622cfb973cd?w=500",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500"
    ],
    price: 75001,
    originalPrice: 85,
    location: "Santorini, Greece",
    rating: 4.9,
    reviewCount: 156,
    duration: "2.5 hours",
    category: "Relaxation",
    included: [
      "Luxury sailboat",
      "Champagne & appetizers",
      "Experienced captain",
      "Life jackets",
      "Blankets"
    ],
    requirements: [
      "Swimwear (optional)",
      "Light jacket"
    ],
    host: {
      name: "Aegean Sailing",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      rating: 4.9
    },
    maxParticipants: 8,
    isActive: true
  },
  {
    title: "Mountain Hiking Adventure",
    description: "Challenge yourself with a guided mountain hike through stunning alpine landscapes. Suitable for intermediate hikers with breathtaking views and wildlife spotting.",
    shortDescription: "Challenging alpine hike with stunning mountain views",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500",
      "https://images.unsplash.com/photo-1464822759844-4c0a1a87c6b4?w=500",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500"
    ],
    price: 65,
    location: "Swiss Alps, Switzerland",
    rating: 4.5,
    reviewCount: 94,
    duration: "6 hours",
    category: "Adventure",
    included: [
      "Certified mountain guide",
      "Hiking poles",
      "Lunch pack",
      "First aid kit",
      "Transport to trailhead"
    ],
    requirements: [
      "Good physical condition",
      "Hiking shoes",
      "Water (2L)",
      "Weather-appropriate clothing"
    ],
    host: {
      name: "Alpine Guides",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      rating: 4.6
    },
    maxParticipants: 10,
    isActive: true
  },
  {
  title: "Kayaking in Kerala Backwaters",
  description: "Paddle through lush lagoons and tranquil lakes of Kerala. Includes safety gear, guide, and refreshments. Suitable for beginners and families.",
  shortDescription: "Gentle kayaking adventure in the scenic backwaters.",
  images: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500",
    "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?w=500"
  ],
  price: 49000,
  originalPrice: 59,
  location: "Alleppey, Kerala",
  rating: 4.5,
  reviewCount: 80,
  duration: "2 hours",
  category: "Nature",
  included: [
    "Kayak and safety gear",
    "Expert local guide",
    "Bottled water",
    "Photographs"
  ],
  requirements: [
    "Basic swimming ability",
    "Sun protection"
  ],
  host: {
    name: "Lagoon Adventures",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a67b2?w=150",
    rating: 4.7
  },
  maxParticipants: 15,
  isActive: true
},
{
  title: "Street Food Tasting Safari",
  description: "Embark on a delicious journey through bustling food streets. Try local delicacies from 8 legendary stalls and enjoy stories of their heritage.",
  shortDescription: "Eat your way through iconic street food spots with an expert.",
  images: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
    "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?w=500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500"
  ],
  price: 25,
  location: "Bangkok, Thailand",
  rating: 4.8,
  reviewCount: 22000,
  duration: "3 hours",
  category: "Food & Drink",
  included: [
    "Guided street tour",
    "8+ food tastings",
    "Drink samples",
    "Map for foodies"
  ],
  requirements: [
    "Bring appetite!",
    "Allergy info at booking"
  ],
  host: {
    name: "Bangkok Bites",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 4.9
  },
  maxParticipants: 10,
  isActive: true
},
{
  title: "Hot Air Balloon Sunrise Ride",
  description: "Soar above valleys and vineyards as the sun rises. Includes a safety briefing, 45-minute flight, and post-landing breakfast picnic.",
  shortDescription: "Enjoy spectacular sunrise views from a hot air balloon.",
  images: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500",
    "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?w=500",
    "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=500"
  ],
  price: 25000,
  originalPrice: 295,
  location: "Cappadocia, Turkey",
  rating: 4.9,
  reviewCount: 105,
  duration: "1.5 hours",
  category: "Adventure",
  included: [
    "Balloon flight",
    "Champagne breakfast",
    "Flight certificate",
    "Insurance"
  ],
  requirements: [
    "No recent injuries",
    "Children 7+ only"
  ],
  host: {
    name: "Sky Adventures",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    rating: 4.8
  },
  maxParticipants: 16,
  isActive: true
},
{
  title: "Sunday Morning Yoga & Brunch",
  description: "Start your Sunday with a rejuvenating yoga class on a rooftop, followed by a healthy vegetarian brunch buffet.",
  shortDescription: "Rooftop yoga with panoramic views and nourishing brunch.",
  images: [
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a67b2?w=500",
    "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?w=500"
  ],
  price: 35000,
  location: "Barcelona, Spain",
  rating: 4.7,
  reviewCount: 51,
  duration: "2.5 hours",
  category: "Wellness",
  included: [
    "1 hour yoga class",
    "Brunch buffet",
    "Yoga mat rental",
    "Detox drinks"
  ],
  requirements: [
    "Bring water bottle",
    "No prior yoga needed"
  ],
  host: {
    name: "Yoga Bliss BCN",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 4.9
  },
  maxParticipants: 18,
  isActive: true
},
{
  title: "Beginner Surfing Lesson",
  description: "Learn the basics of surfing from certified instructors on gentle, rolling waves. Gear and safety instruction included.",
  shortDescription: "Try surfing with expert guidance—no experience needed!",
  images: [
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=500",
    "https://images.unsplash.com/photo-1519864603173-7c3946e71c44?w=500",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500"
  ],
  price: 55000,
  location: "Bali, Indonesia",
  rating: 4.6,
  reviewCount: 112,
  duration: "2 hours",
  category: "Sports",
  included: [
    "Surfboard & wetsuit",
    "Safety briefing",
    "1.5h lesson",
    "Locker/storage"
  ],
  requirements: [
    "Swimwear",
    "Able to swim 25m"
  ],
  host: {
    name: "Bali Surf School",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 4.7
  },
  maxParticipants: 12,
  isActive: true
},
{
  title: "Camel Safari in the Thar Desert",
  description: "Ride across the golden sands of the Thar Desert, witness stunning sunsets, folk music, and enjoy authentic Rajasthani cuisine at a desert camp.",
  shortDescription: "Camel ride, folk music & dinner under the stars.",
  images: [
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500",
    "https://images.unsplash.com/photo-1531312266756-cd983b4f441c?w=500"
  ],
  price: 60000,
  location: "Jaisalmer, Rajasthan",
  rating: 4.7,
  reviewCount: 134,
  duration: "5 hours",
  category: "Adventure",
  included: [
    "Camel ride",
    "Camp dinner",
    "Folk performance",
    "Guide"
  ],
  requirements: [
    "Comfortable clothing",
    "Sunscreen"
  ],
  host: {
    name: "Desert Trails",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    rating: 4.8
  },
  maxParticipants: 10,
  isActive: true
},
{
  title: "Tea Garden Walk & Tasting",
  description: "Wander through lush tea estates with a local expert, learn how tea is made, and sample fine Darjeeling teas.",
  shortDescription: "Guided tea walk, plucking demo, tea tasting.",
  images: [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a67b2?w=500",
    "https://images.unsplash.com/photo-1505731139091-6f8d74bab7b2?w=500"
  ],
  price: 30000,
  location: "Darjeeling, West Bengal",
  rating: 4.9,
  reviewCount: 85,
  duration: "2 hours",
  category: "Nature",
  included: [
    "Estate tour",
    "Tea plucking",
    "Factory visit",
    "Tea tasting"
  ],
  requirements: [
    "Walking shoes",
    "Raincoat (monsoon)"
  ],
  host: {
    name: "Eastern Tea Estates",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 4.9
  },
  maxParticipants: 16,
  isActive: true
},
{
  title: "Pink City Heritage Cycle Tour",
  description: "Pedal through Jaipur's historic lanes at sunrise, visit iconic palaces and markets, and enjoy local breakfast.",
  shortDescription: "Guided morning cycling tour of Jaipur’s old city.",
  images: [
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=500",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500"
  ],
  price: 22000,
  location: "Jaipur, Rajasthan",
  rating: 4.8,
  reviewCount: 58,
  duration: "3 hours",
  category: "Sports",
  included: [
    "Bicycle & helmet",
    "English-speaking guide",
    "Breakfast",
    "Mineral water"
  ],
  requirements: [
    "Basic cycling skill",
    "Comfortable wear"
  ],
  host: {
    name: "Jaipur Rides",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 4.9
  },
  maxParticipants: 25,
  isActive: true
},
{
  title: "Mumbai Street Food Crawl",
  description: "Taste iconic Mumbai street eats like vada pav, pav bhaji, and kulfi on this guided evening tour.",
  shortDescription: "Iconic city foods, night tour, foodie stories.",
  images: [
    "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?w=500",
    "https://images.unsplash.com/photo-1519864603173-7c3946e71c44?w=500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500"
  ],
  price: 16230,
  location: "Mumbai, Maharashtra",
  rating: 4.7,
  reviewCount: 198,
  duration: "2.5 hours",
  category: "Food & Drink",
  included: [
    "Food tastings",
    "Local expert",
    "Photographs"
  ],
  requirements: [
    "No nut allergies",
    "ID for verification"
  ],
  host: {
    name: "Flavor Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 4.8
  },
  maxParticipants: 15,
  isActive: true
},
{
  title: "Himalayan Meditation Retreat",
  description: "Experience tranquility at a weekend wellness retreat. Includes yoga, meditation, nature walks, and healthy meals in a peaceful mountain setting.",
  shortDescription: "2-day mountain retreat for yoga, meditation, wellness.",
  images: [
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a67b2?w=500",
    "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?w=500"
  ],
  price: 120200,
  location: "Rishikesh, Uttarakhand",
  rating: 4.9,
  reviewCount: 79,
  duration: "2 days",
  category: "Wellness",
  included: [
    "Yoga & meditation sessions",
    "Accommodation",
    "Vegetarian meals",
    "Guided nature walk"
  ],
  requirements: [
    "Comfortable clothes",
    "Open mind"
  ],
  host: {
    name: "Yogi Retreats",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 4.9
  },
  maxParticipants: 14,
  isActive: true
}


];

const promoCodes = [
  {
    code: "SAVE10",
    description: "Get 10% off your booking",
    discountType: "percentage",
    discountValue: 10,
    minAmount: 50,
    maxDiscount: 50,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2026-12-31'),
    usageLimit: 100,
    usedCount: 25,
    isActive: true
  },
  {
    code: "FLAT100",
    description: "Get $100 off on bookings above $200",
    discountType: "fixed",
    discountValue: 100,
    minAmount: 200,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2026-06-30'),
    usageLimit: 50,
    usedCount: 12,
    isActive: true
  },
  {
    code: "WELCOME15",
    description: "15% off for first-time customers",
    discountType: "percentage",
    discountValue: 15,
    minAmount: 30,
    maxDiscount: 75,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2026-12-31'),
    usageLimit: 200,
    usedCount: 89,
    isActive: true
  },
  {
    code: "SUMMER25",
    description: "25% off summer experiences",
    discountType: "percentage",
    discountValue: 25,
    minAmount: 100,
    maxDiscount: 100,
    validFrom: new Date('2024-06-01'),
    validUntil: new Date('2026-08-31'),
    usageLimit: 75,
    usedCount: 18,
    isActive: true
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Generate dates for the next 30 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

// Generate time slots
const generateTimeSlots = () => {
  return [
    { startTime: "09:00", endTime: "13:00" },
    { startTime: "10:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "18:00" },
    { startTime: "18:00", endTime: "22:00" },
    { startTime: "20:00", endTime: "24:00" }
  ];
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Experience.deleteMany({});
    await Slot.deleteMany({});
    await Promo.deleteMany({});
    await Booking.deleteMany({});

    // Insert experiences
    console.log('Inserting experiences...');
    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`✅ Inserted ${createdExperiences.length} experiences`);

    // Insert promo codes
    console.log('Inserting promo codes...');
    const createdPromos = await Promo.insertMany(promoCodes);
    console.log(`✅ Inserted ${createdPromos.length} promo codes`);

    // Generate slots for each experience
    console.log('Generating time slots...');
    const slots = [];
    const dates = generateDates();
    const timeSlots = generateTimeSlots();

    createdExperiences.forEach(experience => {
      dates.forEach(date => {
        timeSlots.forEach(timeSlot => {
          // Random capacity between 8-20
          const capacity = Math.floor(Math.random() * 13) + 8;
          // Random booked count (0 to capacity-2 to ensure some available slots)
          const bookedCount = Math.floor(Math.random() * (capacity - 1));
          
          slots.push({
            experienceId: experience._id,
            date: new Date(date),
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            capacity: capacity,
            bookedCount: bookedCount,
            price: experience.price,
            isActive: true
          });
        });
      });
    });

    // Insert slots in batches to avoid memory issues
    const batchSize = 100;
    for (let i = 0; i < slots.length; i += batchSize) {
      const batch = slots.slice(i, i + batchSize);
      await Slot.insertMany(batch);
      console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1}`);
    }

    console.log(`✅ Inserted ${slots.length} time slots`);

    // Create some sample bookings
    console.log('Creating sample bookings...');
    const sampleBookings = [
      {
        userName: "John Doe",
        userEmail: "john.doe@example.com",
        userPhone: "+1234567890",
        participants: 2,
        promoCode: "SAVE10"
      },
      {
        userName: "Jane Smith",
        userEmail: "jane.smith@example.com",
        userPhone: "+0987654321",
        participants: 1,
        promoCode: null
      }
    ];

    // Get some available slots for bookings
    const availableSlots = await Slot.find({
      $expr: { $lt: ['$bookedCount', '$capacity'] }
    }).limit(2).populate('experienceId');

    for (let i = 0; i < Math.min(availableSlots.length, sampleBookings.length); i++) {
      const slot = availableSlots[i];
      const bookingData = sampleBookings[i];
      
      let originalPrice = slot.price * bookingData.participants;
      let discountAmount = 0;

      // Apply promo code if exists
      if (bookingData.promoCode) {
        const promo = await Promo.findOne({ code: bookingData.promoCode });
        if (promo && promo.isValid()) {
          discountAmount = promo.calculateDiscount(originalPrice);
          promo.usedCount += 1;
          await promo.save();
        }
      }

      const finalPrice = originalPrice - discountAmount;

      const booking = new Booking({
        slotId: slot._id,
        experienceId: slot.experienceId._id,
        ...bookingData,
        originalPrice,
        discountAmount,
        finalPrice
      });

      await booking.save();
      
      // Update slot booked count
      slot.bookedCount += bookingData.participants;
      await slot.save();
    }

    console.log('✅ Created sample bookings');

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   Experiences: ${createdExperiences.length}`);
    console.log(`   Promo Codes: ${createdPromos.length}`);
    console.log(`   Time Slots: ${slots.length}`);
    console.log(`   Sample Bookings: ${Math.min(availableSlots.length, sampleBookings.length)}`);
    
    console.log('\n🔗 Sample API Endpoints to test:');
    console.log('   GET  http://localhost:8000/api/experiences');
    console.log('   GET  http://localhost:8000/api/experiences/:id');
    console.log('   POST http://localhost:8000/api/bookings');
    console.log('   POST http://localhost:8000/api/promo/validate');
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;