// var jwt = require('jsonwebtoken');
// var authMiddleWare = function(req, res, next) {
    
//     var token = req.headers['authorization'];
    
//     // var token = req.body.token;
//     jwt.verify(token, 'login_auth', (err, decoded) => {
//         if(err) {
//             res.json({message: 'unauthenticated'});
//         } else {
//             next();
//         }
//     })
// };


// module.exports = {
//     authMiddleWare
// }