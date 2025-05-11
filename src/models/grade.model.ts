import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import Enrollment from "./enrollment.model";

interface GradeAttributes {
  grade_id: number;
  enrollment_id: number;
  grade: number;
}

class Grade extends Model<GradeAttributes> implements GradeAttributes {
  public grade_id!: number;
  public enrollment_id!: number;
  public grade!: number;
}

Grade.init(
  {
    grade_id: {
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
    grade: {
      type: DataTypes.DECIMAL(5, 2),
    },
  },
  {
    sequelize,
    tableName: "grades",
  }
);

export default Grade;
