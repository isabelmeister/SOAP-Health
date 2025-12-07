const { getAllSizes } = require('../data/sizesData');

const getSizes = (req, res) => {
  try {
    const sizes = getAllSizes();
    res.json(sizes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sizes' });
  }
};

module.exports = {
  getSizes
};