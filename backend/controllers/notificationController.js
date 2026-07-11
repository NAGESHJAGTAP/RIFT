import Notification from '../models/Notification.js';
import { successResponse } from '../utils/apiResponse.js';
import ApiError from '../utils/apiError.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return successResponse(res, 200, 'Notifications retrieved', notifications);
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isRead: true },
      { new: true }
    );
    if (!notification) return next(new ApiError(404, 'Notification not found'));
    return successResponse(res, 200, 'Notification marked as read', notification);
  } catch (err) {
    next(err);
  }
};
