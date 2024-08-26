const { createIndex, indexDocument } = require('../services/search');
const Media = require('../models/Media');

const indexMediaContent = async () => {
  await createIndex('media');

  const mediaData = await Media.find(); // Fetch all media items from MongoDB

  for (let media of mediaData) {
    await indexDocument('media', media.toObject());
  }

  console.log('Media content indexed successfully');
};

indexMediaContent().catch(console.error);
