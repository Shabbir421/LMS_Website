import express from 'express'

import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js'
import { protectEducator } from '../middlewares/authMiddleware.js';
import upload from '../configs/multer.js';

const educatorRouter = express.Router()

// add educator role


// educatorRouter.get('/update-role', updateRoleToEducator);
// middleware to check admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
  next();
};

// only admin can upgrade a user to educator
app.post("/admin/make-educator", isAdmin, async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(userId, { role: "educator" });
    res.json({ success: true, message: "Educator role granted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);
educatorRouter.get('/courses', protectEducator, getEducatorCourses);
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);


export default educatorRouter;