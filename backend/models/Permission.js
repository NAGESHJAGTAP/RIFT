import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema(
  {
    passportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Passport', required: true },
    targetResource: { type: String, required: true },
    allowedActions: [{ type: String }],
    dailyLimitUSD: { type: Number, default: 0 },
    status: { type: String, enum: ['allowed', 'restricted', 'blocked'], default: 'allowed' },
  },
  { timestamps: true }
);

permissionSchema.index({ passportId: 1 });

export default mongoose.model('Permission', permissionSchema);
