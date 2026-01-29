import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    /* USER RELATION */
    userId: {
      type: String,
      required: false, // 👈 TEMP FIX
      index: true,
    },


    /*  CORE DETAILS */
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      index: true,
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    /*   TIME & SCHEDULING */
    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
      validate: {
        validator: function (value) {
          return !this.startTime || value > this.startTime;
        },
        message: "End time must be after start time",
      },
    },

    dueDate: {
      type: Date,
      index: true,
    },

    /*   RECURRENCE */
    recurrence: {
      type: {
        frequency: {
          type: String,
          enum: ["daily", "weekly", "monthly"],
        },
        interval: {
          type: Number,
          default: 1, // every 1 day/week/month
        },
        endDate: {
          type: Date,
        },
      },
      default: null,
    },

    /*  DEPENDENCIES */
    dependencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    /*   STATUS */
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "blocked"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
