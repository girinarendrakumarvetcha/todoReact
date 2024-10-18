const expressJwt = require('express-jwt');
const config = require('../config.json');
const ModAdminCtrl = require('../controllers/mod_admin-ctrl');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            /^\/api\/user\/login\/.*/,
            // /^\/api\/user\/add\//,
            `/api/user/add`
        ]
    });
}

async function isRevoked(req, payload, done) { 
    const user = await ModAdminCtrl.jwtUserAuthenticationById(payload);      
    if (!user) {
        return done(null, true);
    }
    done();
};