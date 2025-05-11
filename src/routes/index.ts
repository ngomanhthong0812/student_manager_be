import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { getAttendancesBySchedule } from "../controllers/attendance.controller";
import { updateAttendance } from "../controllers/attendance.controller";
import { getTeachingScheduleByTeacher } from "../controllers/teaching-schedule.controller";
import { getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/get-all-users", getAllUsers);

router.post("/register", register);
router.post("/login", login);

router.get("/list-diemdanh/:id_lichday", getAttendancesBySchedule);
router.put("/diemdanh/:id_diemdanh", updateAttendance);
router.get("/lichday", getTeachingScheduleByTeacher);

export default router;
