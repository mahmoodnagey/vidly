module.exports = function (req, res, next) {
    // Note that
    // 401 Unauthorized : try again with correct credentials
    // 403 Forbidden : don't try again: if you authorized with your credentials meaning you account can't access
    
    if (!req.user.isAdmin) return res.status(403).send('Access Denied.');
    
    next();
}