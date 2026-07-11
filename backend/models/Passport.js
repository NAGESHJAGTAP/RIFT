import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const passportSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    passportId: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    agentName: {
      type: String,
      required: [true, 'Please enter agent name'],
      trim: true,
    },
    agentType: {
      type: String,
      required: [true, 'Please enter agent type'],
      trim: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKeyHash: {
      type: String,
      required: true,
    },
    qrCodeData: {
      type: String,
      required: true,
    },
    trustScore: {
      type: Number,
      default: 800,
      min: 0,
      max: 1000,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'revoked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Passport = mongoose.model('Passport', passportSchema);

export default Passport;
