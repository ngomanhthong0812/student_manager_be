import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { compareSync } from "../utils/encrypt";
import Student from "./student.model";
import Teacher from "./teacher.model";

// Định nghĩa interface cho User
interface UserAttributes {
  user_id: number;
  email: string;
  password_hash: string;
  full_name: string;
  role: "admin" | "student" | "teacher";
  created_at?: Date;
  updated_at?: Date;
}

// Tạo class User dựa trên Sequelize Model
class User extends Model<UserAttributes> implements UserAttributes {
  public user_id!: number;
  public email!: string;
  public password_hash!: string;
  public full_name!: string;
  public role!: "admin" | "student" | "teacher";
  public created_at!: Date;
  public updated_at!: Date;
  static validPassword: (password: string, hash: string) => boolean;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "student", "teacher"),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;
