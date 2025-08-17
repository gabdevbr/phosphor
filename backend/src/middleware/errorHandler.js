const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ 
      error: 'File too large. Maximum size is 5MB.' 
    });
  }

  if (err.message === 'Only image files are allowed') {
    return res.status(400).json({ 
      error: 'Only image files are allowed.' 
    });
  }

  res.status(500).json({ 
    error: 'Internal server error' 
  });
};

module.exports = errorHandler;