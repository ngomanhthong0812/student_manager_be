import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import User from "./user.model";

interface TeacherAttributes {
  teacher_id: number;
  user_id: number;
  specialty: string;
}

class Teacher extends Model<TeacherAttributes> implements TeacherAttributes {
  public teacher_id!: number;
  public user_id!: number;
  public specialty!: string;
  public user?: User;
}

Teacher.init(
  {
    teacher_id: {
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
    specialty: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "teachers",
  }
);

export default Teacher;
