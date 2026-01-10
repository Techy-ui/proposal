const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    // 🔐 Link proposal to logged-in user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    recipient: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    theme: {
      type: String,
      enum: ["romantic", "funny", "poetic"],
      default: "romantic"
    },

    image: {
      type: String, // base64 or image URL (later Cloudinary)
      default: null
    },

    // 💌 Optional responses (future feature)
    responses: [
      {
        response: {
          type: String, // yes / no / maybe
          enum: ["yes", "no", "maybe"]
        },
        respondedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // 📊 Analytics (future-ready)
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Proposal", proposalSchema);
