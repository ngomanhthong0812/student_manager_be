import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import Teacher from "./teacher.model";
import Class from "./class.model";
import Course from "./course.model";
import Attendance from "./attendance.model";

interface TeachingScheduleAttributes {
  schedule_id: number;
  teacher_id: number;
  class_id: number;
  course_id: number;
  lesson_period: string;
  room: string;
  date: Date;
}

class TeachingSchedule extends Model<TeachingScheduleAttributes> {
  public schedule_id!: number;
  public teacher_id!: number;
  public class_id!: number;
  public course_id!: number;
  public lesson_period!: string;
  public room!: string;
  public date!: Date;
  public class?: Class;
  public teacher?: Teacher;
}

TeachingSchedule.init(
  {
    schedule_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: "teacher_id",
      },
      onUpdate: "CASCADE",
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
        key: "class_id",
      },
      onUpdate: "CASCADE",
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "course_id",
      },
      onUpdate: "CASCADE",
    },
    lesson_period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "teaching_schedules",
    timestamps: true,
  }
);

export default TeachingSchedule;
