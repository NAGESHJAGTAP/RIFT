import User from '../models/User.js';
import ApiError from '../utils/apiError.js';
import { verifyAccessToken } from '../utils/tokenHelper.js';

/**
 * Protect routes - Verifies JWT Access Token
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route, token missing');
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Get user from token and attach to request
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError(401, 'User associated with this token no longer exists');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Grant access to specific roles
 * @param {...String} roles 
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `User role '${req.user ? req.user.role : 'none'}' is not authorized to access this resource`
        )
      );
    }
    next();
  };
};
