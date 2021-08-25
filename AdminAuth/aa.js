const jwt = require ('jsonwebtoken');

const res = jwt.sign({UserId: 'admin1@test.com', IsAdmin: false}, 'JingPersonalProject');
console.log(res);