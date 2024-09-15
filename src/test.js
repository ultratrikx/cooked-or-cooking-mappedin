import fs from 'fs';

// Read the JSON file
const rawData = fs.readFileSync('room_pairings.json');
const roomPairings = JSON.parse(rawData);

// Extract the format of the first item
const firstItem = roomPairings[0];

// Transform the data to match the format of the first item
const transformedData = roomPairings.map(() => firstItem);

// Save the transformed data back to the JSON file
fs.writeFileSync('room_pairings.json', JSON.stringify(transformedData, null, 2));