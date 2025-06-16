import { TeachingSchedule, Teacher, Class, Course, User } from "../models";
import { Op } from "sequelize";

export const fetchTeachingScheduleByTeacher = async (
  date: Date = new Date(),
  id_gv: number
) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const schedules = await TeachingSchedule.findAll({
    where: {
      teacher_id: id_gv,
      date: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
    include: [
      {
        model: Course,
        as: "course",
        attributes: ["course_name"],
      },
      {
        model: Class,
        as: "class",
        attributes: ["class_name"],
      },
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
    ],
  });

  const result = schedules.map((schedule) => ({
    id_lichday: schedule.schedule_id,
    tenlop: schedule.class?.class_name || "",
    tiet: schedule.lesson_period,
    phong: schedule.room,
    tengiaovien: schedule.teacher?.user.full_name || "",
  }));

  return result;
};

export const fetchTeachingScheduleByTeacherInWeek = async (
  date: Date = new Date(),
  id_gv: number
) => {
  // Tìm ngày đầu tuần (thứ 2) và cuối tuần (chủ nhật)
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const schedules = await TeachingSchedule.findAll({
    where: {
      teacher_id: id_gv,
      date: {
        [Op.between]: [monday, sunday],
      },
    },
    include: [
      {
        model: Course,
        as: "course",
        attributes: ["course_name"],
      },
      {
        model: Class,
        as: "class",
        attributes: ["class_name"],
      },
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
    ],
  });

  const result = schedules.map((schedule) => ({
    id_lichday: schedule.schedule_id,
    tenlop: schedule.class?.class_name || "",
    tiet: schedule.lesson_period,
    phong: schedule.room,
    tengiaovien: schedule.teacher?.user.full_name || "",
    ngay: schedule.date,
  }));

  return result;
};
