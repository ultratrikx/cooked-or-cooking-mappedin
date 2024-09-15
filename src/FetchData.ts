import {MongoClient} from 'mongodb';

async function fetchFormattedUserData() {
  const uri = "mongodb+srv://rohanthm:IFVLaGEI9C4mR4md@spotify-data.hrafc.mongodb.net/?retryWrites=true&w=majority&appName=spotify-data";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('cooked');
    const collection = database.collection('user_sessions');

    const cursor = collection.find({}, { projection: { _id: 0, longitude: 1, latitude: 1, productivity_score: 1 } });
    const documents = await cursor.toArray();

    const formattedData = documents.map(doc => [
      doc.longitude,
      doc.latitude,
      doc.productivity_score
    ]);

    return formattedData;

  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// const express = require('express');
// const fetchFormattedUserData = require('./path/to/fetchFormattedUserData');

// const app = express();

// app.get('/api/getUserData', async (req, res) => {
//   try {
//     const data = await fetchFormattedUserData();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

// app.listen(3000, () => console.log('Server running on port 3000'));