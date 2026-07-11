import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    passportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Passport', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    actionRequested: { type: String, required: true },
    actionDetail: { type: String },
    requestPayload: { type: mongoose.Schema.Types.Mixed },
    riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'LOW' },
    riskScore: { type: Number, default: 0 },
    geminiReasoning: { type: String },
    decision: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
    triggeredBy: { type: String, enum: ['system', 'user'], default: 'user' },
  },
  { timestamps: true }
);

activitySchema.index({ passportId: 1 });
activitySchema.index({ createdAt: -1 });

export default mongoose.model('Activity', activitySchema);
