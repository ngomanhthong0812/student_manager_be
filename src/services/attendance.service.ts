import {
  Attendance,
  TeachingSchedule,
  Course,
  Enrollment,
  Student,
  User,
  Teacher,
  Class,
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
  id_lichday: number,
  masv: string,
  trangthai: "present" | "absent" | "late"
) => {
  const attendance = await Attendance.findOne({
    where: { schedule_id: id_lichday },
  });

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

export const fetchTeacherBySchedule = async (id_lichday: number) => {
  const attendance = await Attendance.findOne({
    where: { schedule_id: id_lichday },
    include: [
      {
        model: TeachingSchedule,
        as: "schedule",
        attributes: ["room", "date"],
        include: [
          {
            model: Teacher,
            as: "teacher",
            attributes: ["teacher_id"],
            include: [
              {
                model: User,
                as: "user",
                attributes: ["full_name"],
              },
            ],
          },
          {
            model: Class,
            as: "class",
            attributes: ["class_id", "class_name"],
          },
          {
            model: Course,
            as: "course",
            attributes: ["course_name"],
          },
        ],
      },
    ],
  });

  if (!attendance || !attendance.schedule) {
    return null;
  }

  const { course, teacher, room, date } = attendance.schedule as any;

  return {
    course_name: course?.course_name || "",
    room: room || "",
    teacher_name: teacher?.user?.full_name || "",
    class_name: teacher?.class_name,
    date: date || "",
  };
};
