import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import {
  getAttendancesBySchedule,
  getTeacherBySchedule,
} from "../controllers/attendance.controller";
import { updateAttendance } from "../controllers/attendance.controller";
import {
  getTeachingScheduleByTeacher,
  getTeachingScheduleByTeacherInWeek,
} from "../controllers/teaching-schedule.controller";
import { getAllUsers } from "../controllers/user.controller";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";
import { getAllClasses } from "../controllers/class.controller";

const router = Router();

router.get("/get-all-users", getAllUsers);

router.post("/register", register);
router.post("/login", login);

router.get("/list-diemdanh/:id_lichday", getAttendancesBySchedule);
router.get("/teacher-diemdanh/:id_lichday", getTeacherBySchedule);
router.put("/diemdanh/:id_lichday", updateAttendance);

router.get("/lichday", getTeachingScheduleByTeacher);
router.get("/lichday-tuan", getTeachingScheduleByTeacherInWeek);

router.get("/student", getAllStudents);
router.post("/create-student", createStudent);
router.put("/update-student/:id", updateStudent);
router.delete("/delete-student/:id", deleteStudent);

router.get("/classes", getAllClasses);

export default router;
