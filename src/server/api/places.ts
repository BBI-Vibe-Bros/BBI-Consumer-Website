import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/place-details', async (req, res) => {
  try {
    const { placeId } = req.query;
    const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!placeId || !apiKey) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          fields: 'name,rating,reviews,user_ratings_total',
          key: apiKey
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).json({ error: 'Failed to fetch place details' });
  }
});

export default router; 