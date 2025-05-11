import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

interface ClassAttributes {
  class_id: number;
  class_name: string;
  academic_year: string;
}

class Class extends Model<ClassAttributes> implements ClassAttributes {
  public class_id!: number;
  public class_name!: string;
  public academic_year!: string;
}

Class.init(
  {
    class_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academic_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "classes",
  }
);

export default Class;
