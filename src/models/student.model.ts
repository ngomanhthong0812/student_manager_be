import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import User from "./user.model";
import Class from "./class.model";
import Enrollment from "./enrollment.model";

export interface StudentAttributes {
  student_id: number;
  user_id: number;
  class_id: number;
  student_code: string;
  date_of_birth: Date;
  phone: string;
  address: string;
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  public student_id!: number;
  public user_id!: number;
  public class_id!: number;
  public student_code!: string;
  public date_of_birth!: Date;
  public phone!: string;
  public address!: string;
  public user?: User;
}

Student.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
      onUpdate: "CASCADE",
    },
    class_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Class,
        key: "class_id",
      },
      onUpdate: "CASCADE",
    },
    student_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "students",
  }
);

export default Student;
