const seedData = require('./seedData');

// Check if we should run the seeder
const shouldSeed = process.argv[2] !== '--dry-run';

if (shouldSeed) {
  console.log('🌱 Starting database seeding...');
  seedData();
} else {
  console.log('🌱 Dry run - database seeding skipped');
  process.exit(0);
}