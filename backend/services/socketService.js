/**
 * Simple wrapper around Socket.io for consent notifications.
 */
class SocketService {
  constructor() {
    this.pendingActivities = new Map(); // activityId -> resolve function
  }

  /**
   * Send a pending activity approval request to a specific user.
   * @param {string} userId - MongoDB user ID.
   * @param {object} activityData - Activity details to present.
   * @returns {Promise<string>} - Resolves with "approved" or "rejected".
   */
  async sendApprovalRequest(userId, activityData) {
    const { io } = await import('../server.js');
    return new Promise((resolve) => {
      this.pendingActivities.set(activityData._id.toString(), resolve);
      io.to(userId).emit('approvalRequest', activityData);
    });
  }

  /**
   * Handle response from the client.
   */
  handleResponse(data, socket) {
    const { activityId, decision } = data;
    const resolver = this.pendingActivities.get(activityId);
    if (resolver) {
      resolver(decision);
      this.pendingActivities.delete(activityId);
    }
    console.log(`Received activity response ${decision} for ${activityId}`);
  }
}

export const socketService = new SocketService();

