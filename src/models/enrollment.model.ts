import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import Student from "./student.model";
import Course from "./course.model";
import Attendance from "./attendance.model";

interface EnrollmentAttributes {
  enrollment_id: number;
  student_id: number;
  course_id: number;
  enrollment_date: Date;
}

class Enrollment
  extends Model<EnrollmentAttributes>
  implements EnrollmentAttributes
{
  public enrollment_id!: number;
  public student_id!: number;
  public course_id!: number;
  public enrollment_date!: Date;
  public student?: Student;
  public course?: Course;
}

Enrollment.init(
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "student_id",
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
    enrollment_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "enrollments",
  }
);

export default Enrollment;
