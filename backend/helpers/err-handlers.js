function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        return res.status(200).json({ success:false,message: err });
    }
    if (err.name === 'ValidationError') {
        return res.status(200).json({success:false, message: err.message });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(200).json({success:false, message: 'Invalid Token' });
    }
    return res.status(500).json({ success:false,message: err.message });
}

module.exports = errorHandler;