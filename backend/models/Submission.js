const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);