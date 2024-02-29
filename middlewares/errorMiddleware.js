module.exports = (err, req, res, next) => {
    if (err.name === 'INVALID_PARAM') {
      return res.status(400).json({ message: 'Invalid parameter', error: err.message });
    } else {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };  