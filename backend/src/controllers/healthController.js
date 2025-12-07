const getHealthStatus = (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Pizza API',
    version: '1.0.0'
  });
};

module.exports = {
  getHealthStatus
};