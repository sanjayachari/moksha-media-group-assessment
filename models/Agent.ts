import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IAgent extends Document {
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AgentSchema = new Schema<IAgent>(
  {
    name: {
      type: String,
      required: [true, 'Please provide an agent name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'inactive',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Agent: Model<IAgent> = mongoose.models.Agent || mongoose.model<IAgent>('Agent', AgentSchema)

export default Agent
