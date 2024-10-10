const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees", error: err.message });
  }
});

router.post('/employees', async (req, res) => {
  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

  try {
    const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
  } catch (err) {
    res.status(500).json({ message: "Error creating employee", error: err.message });
  }
});

router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employee", error: err.message });
  }
});

router.put('/employees/:eid', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee details updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error updating employee", error: err.message });
  }
});

router.delete('/employees', async (req, res) => {
  const { eid } = req.query;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(eid);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully."});
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee", error: err.message });
  }
});

module.exports = router;
