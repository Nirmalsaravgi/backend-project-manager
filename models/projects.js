const {Schema, model} = require('mongoose');

// const User = require('./user');

const projectSchema = new Schema({
    name: {
      type: String,
    },
    project_key: {
      type: String,
    },
    description: {
      type: String,
    },
    project_url: {
      type: String,
    },
    github_url: {
      type: String,
    },
    assigned_to: [{
      type: Schema.Types.ObjectId,
      ref: 'user'  // Reference to User model
    }]
  }, { timestamps: true });
  
  const Projects = model('project', projectSchema);
  
  module.exports = Projects;