import { body, validationResult } from 'express-validator';
import ApiError from '../utils/apiError.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));
    return next(new ApiError(400, 'Validation Failed', formattedErrors));
  }
  next();
};

export const validateRegister = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['developer', 'admin'])
    .withMessage('Invalid role type'),
  validateRequest,
];

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateRequest,
];

export const validateForgotPassword = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  validateRequest,
];

export const validateResetPassword = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
  validateRequest,
];

export const validateChangePassword = [
  body('oldPassword')
    .notEmpty()
    .withMessage('Old password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
  validateRequest,
];
