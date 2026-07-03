const Complaint = require("../models/Complaint");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      message: "Complaint Created Successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "name email");

    res.status(200).json(complaints);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Complaint
const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint Not Found",
      });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedComplaint);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint Not Found",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      message: "Complaint Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });
const critical = await Complaint.countDocuments({
  priority: "High",
});
    res.status(200).json({
  total,
  pending,
  inProgress,
  resolved,
  critical,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Analytics Data
const getAnalytics = async (req, res) => {
  try {
    const categoryStats = await Complaint.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusStats = await Complaint.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Complaint.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      categoryStats,
      statusStats,
      priorityStats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Live Activity
const getRecentActivity = async (req, res) => {
  try {
    const activities = await Complaint.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
  "title description category location status priority createdAt"
);

    res.status(200).json(activities);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  getDashboardStats,
  getAnalytics,
  getRecentActivity,
};