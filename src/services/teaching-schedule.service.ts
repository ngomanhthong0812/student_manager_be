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
