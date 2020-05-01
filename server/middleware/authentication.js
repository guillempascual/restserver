const jwt = require('jsonwebtoken')

// verify token
let verifyToken = ( req, res, next) => {
  let token = req.get('Authorization');

  jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'No valid token'
        },
      })
    }

    req.user = decoded.user
    next()
  })
}

// verify admin role
let verifyAdminRole = ( req, res, next) => {
  let token = req.get('Authorization');

  jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (decoded.user.role !== 'ADMIN_ROLE') {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Not sufficient privileges'
        },
      })
    }

    req.user = decoded.user
    next()
  })

}


module.exports = {
  verifyToken,
  verifyAdminRole
}