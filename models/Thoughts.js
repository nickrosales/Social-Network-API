const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAT: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtualts: true,
    },
  }
);
thoughtsSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
