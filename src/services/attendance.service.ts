import {
  Attendance,
  TeachingSchedule,
  Course,
  Enrollment,
  Student,
  User,
} from "../models";

export const fetchAttendancesBySchedule = async (id_lichday: number) => {
  const attendances = await Attendance.findAll({
    where: { schedule_id: id_lichday },
    include: [
      {
        model: Enrollment,
        as: "enrollment",
        attributes: ["enrollment_id"],
        include: [
          {
            model: Course,
            as: "course",
            attributes: ["course_name"],
          },
          {
            model: Student,
            as: "student",
            attributes: ["student_code"],
            include: [
              {
                model: User,
                as: "user",
                attributes: ["full_name"],
              },
            ],
          },
        ],
      },
      {
        model: TeachingSchedule,
        as: "schedule",
        attributes: ["lesson_period"],
      },
    ],
  });

  const result = attendances.map((a) => ({
    id_diemdanh: a.attendance_id,
    tensv: a.enrollment?.student?.user?.full_name || "",
    masv: a.enrollment?.student?.student_code || "",
    sotiet: a.schedule?.lesson_period || "",
    trangthai: a.status,
  }));

  return result;
};

export const updateAttendanceStatus = async (
  id_diemdanh: number,
  masv: string,
  trangthai: "present" | "absent" | "late"
) => {
  const attendance = await Attendance.findByPk(id_diemdanh);

  if (!attendance) {
    throw new Error("Attendance record not found");
  }
  const enrollment = await Enrollment.findOne({
    where: { enrollment_id: attendance.enrollment_id },
    include: [
      {
        model: Student,
        as: "student",
        where: { student_code: masv },
      },
    ],
  });
  if (!enrollment) {
    throw new Error("Student Code does not match enrollment");
  }
  attendance.status = trangthai;
  await attendance.save();

  return attendance;
};
