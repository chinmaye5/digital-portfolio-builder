const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  template: {
    type: String,
    required: true,
    enum: ['template1', 'template2', 'template3']
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  projects: [{
    title: String,
    description: String,
    githubUrl: String,
    liveUrl: String,
    technologies: [String]
  }],
  certifications: [{
    title: String,
    issuer: String,
    date: Date,
    credentialUrl: String
  }],
  media: [{
    type: {
      type: String,
      enum: ['image', 'video', 'presentation']
    },
    url: String,
    caption: String
  }],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
PortfolioSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Portfolio', PortfolioSchema); 