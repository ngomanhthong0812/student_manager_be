import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import Enrollment from "./enrollment.model";
import TeachingSchedule from "./teaching-schedule.model";

interface AttendanceAttributes {
  attendance_id: number;
  enrollment_id: number;
  attendance_date: Date;
  status: "present" | "absent" | "late" | "";
  schedule_id: number;
}

class Attendance
  extends Model<AttendanceAttributes>
  implements AttendanceAttributes
{
  public attendance_id!: number;
  public enrollment_id!: number;
  public attendance_date!: Date;
  public status!: "present" | "absent" | "late" | "";
  public schedule_id!: number;
  public enrollment?: Enrollment;
  public schedule?: TeachingSchedule;
}

Attendance.init(
  {
    attendance_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enrollment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Enrollment,
        key: "enrollment_id",
      },
      onUpdate: "CASCADE",
    },
    attendance_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM("present", "absent", "late", ""),
      allowNull: false,
      defaultValue: "",
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TeachingSchedule,
        key: "schedule_id",
      },
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "attendances",
  }
);

export default Attendance;
