// backend/routes/youtube.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/latest', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          channelId: process.env.YOUTUBE_CHANNEL_ID,
          part: 'snippet',
          order: 'date',
          maxResults: 6,
        },
      }
    );

    const videos = data.items
      .filter(item => item.id.kind === 'youtube#video')
      .map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
      }));

    res.json(videos);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
});

module.exports = router;
