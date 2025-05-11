import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import Teacher from "./teacher.model";
import Class from "./class.model";

interface CourseAttributes {
  course_id: number;
  course_name: string;
  description: string;
  teacher_id: number;
  class_id: number;
}

class Course extends Model<CourseAttributes> implements CourseAttributes {
  public course_id!: number;
  public course_name!: string;
  public description!: string;
  public teacher_id!: number;
  public class_id!: number;
}

Course.init(
  {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
  },
  {
    sequelize,
    tableName: "courses",
  }
);

export default Course;
