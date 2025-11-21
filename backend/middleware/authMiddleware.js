import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  try {
    let token

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      })
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // Attach user ID to request
      req.user = { id: decoded.id }
      
      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid or expired'
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error in auth middleware'
    })
  }
}

export default protect
