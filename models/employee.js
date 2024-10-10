const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  position: String,
  salary: Number,
  date_of_joining: Date,
  department: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
