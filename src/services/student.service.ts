import { Class, Student, User } from "../models";
import bcrypt from "bcrypt";

export const fetchGetAllStudents = async () => {
  return await Student.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password_hash"] },
      },
      {
        model: Class,
        as: "class",
      },
    ],
  });
};

export const create = async (studentData: any) => {
  const hashedPassword = await bcrypt.hash(studentData.password_hash, 10);
  const user = await User.create({
    full_name: studentData.full_name,
    email: studentData.email,
    password_hash: hashedPassword,
    role: "student",
  });

  // Tạo mã sinh viên tự động (ví dụ: "SV" + timestamp)
  const random = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
  const studentCode = `SV${random}`;

  const student = await Student.create({
    user_id: user.user_id,
    class_id: studentData.class_id,
    phone: studentData.phone,
    address: studentData.address,
    student_code: studentCode,
  });

  return student;
};

export const update = async (studentId: number, updateData: any) => {
  console.log(updateData);

  const student = await Student.findByPk(studentId, {
    include: [{ model: User, as: "user" }],
  });
  if (!student) {
    throw new Error("Student not found");
  }

  if (updateData.full_name || updateData.email || updateData.password_hash) {
    const userUpdates: any = {};
    if (updateData.full_name) userUpdates.full_name = updateData.full_name;
    if (updateData.email) userUpdates.email = updateData.email;
    if (updateData.password_hash) {
      userUpdates.password_hash = await bcrypt.hash(
        updateData.password_hash,
        10
      );
    }
    await (student as any).user.update(userUpdates);
  }

  const studentUpdates: any = {};
  if (updateData.class_id) studentUpdates.class_id = updateData.class_id;
  if (updateData.phone) studentUpdates.phone = updateData.phone;
  if (updateData.address) studentUpdates.address = updateData.address;

  await student.update(studentUpdates);

  return student;
};

export const remove = async (studentId: number) => {
  const student = await Student.findByPk(studentId);
  if (!student) {
    throw new Error("Student not found");
  }

  await student.destroy();

  await User.destroy({ where: { user_id: student.user_id } });

  return true;
};
