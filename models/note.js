const mongoose = require("mongoose");

// define the note's database schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // assigns createdAt and updatedAt fields with a Data type
    timestamps: true,
  }
);

// define the Note model with the schema
const Note = mongoose.model("Note", noteSchema);

// export the module
module.exports = Note;
