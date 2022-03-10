const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: false },
    gameUrl: { type: String, required: false },
    playCount: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

gameSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Game', gameSchema);
