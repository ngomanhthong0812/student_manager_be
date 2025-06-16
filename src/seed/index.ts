import sequelize from "../db/connection";
import {
  User,
  Class,
  Student,
  Teacher,
  Course,
  Enrollment,
  Grade,
  Attendance,
  TeachingSchedule,
} from "../models";
import bcrypt from "bcrypt";

async function seed() {
  await sequelize.sync({ force: true }); // Xóa và tạo lại bảng

  const password = await bcrypt.hash("123456", 10);

  // Tạo Admin User
  const admin = await User.create({
    email: "admin@example.com",
    password_hash: password,
    full_name: "Admin One",
    role: "admin",
  });

  // Tạo Teacher User
  const teacherUser = await User.create({
    email: "teacher@example.com",
    password_hash: password,
    full_name: "Teacher One",
    role: "teacher",
  });

  // Tạo Student Users
  const studentUser1 = await User.create({
    email: "student1@example.com",
    password_hash: password,
    full_name: "Student One",
    role: "student",
  });

  const studentUser2 = await User.create({
    email: "student2@example.com",
    password_hash: password,
    full_name: "Student Two",
    role: "student",
  });

  // Tạo lớp học
  const class10A1 = await Class.create({
    class_name: "10A1",
    academic_year: "2024-2025",
  });
  const class10A2 = await Class.create({
    class_name: "10A2",
    academic_year: "2024-2025",
  });

  // Tạo Teacher
  const teacher = await Teacher.create({
    user_id: teacherUser.user_id,
    specialty: "Toán",
  });

  // Tạo Students
  const student1 = await Student.create({
    user_id: studentUser1.user_id,
    class_id: class10A1.class_id,
    student_code: "24050101", // Thêm mã sinh viên
    date_of_birth: new Date("2008-05-10"),
    phone: "0912345678",
    address: "123 Đường ABC, TP.HCM",
  });

  const student2 = await Student.create({
    user_id: studentUser2.user_id,
    class_id: class10A1.class_id,
    student_code: "24050102",
    date_of_birth: new Date("2008-06-10"),
    phone: "0912345679",
    address: "123 Đường DEF, TP.HCM",
  });

  // Tạo 2 khóa học
  const course1 = await Course.create({
    course_name: "Toán 10",
    description: "Môn Toán lớp 10",
    teacher_id: teacher.teacher_id,
    class_id: class10A1.class_id,
  });

  const course2 = await Course.create({
    course_name: "Lý 10",
    description: "Môn Lý lớp 10",
    teacher_id: teacher.teacher_id,
    class_id: class10A1.class_id,
  });

  // Tạo Enrollment cho sinh viên vào 2 khóa học
  const enrollment1Course1 = await Enrollment.create({
    student_id: student1.student_id,
    course_id: course1.course_id,
    enrollment_date: new Date(),
  });

  const enrollment2Course1 = await Enrollment.create({
    student_id: student2.student_id,
    course_id: course1.course_id,
    enrollment_date: new Date(),
  });

  const enrollment1Course2 = await Enrollment.create({
    student_id: student1.student_id,
    course_id: course2.course_id,
    enrollment_date: new Date(),
  });

  const enrollment2Course2 = await Enrollment.create({
    student_id: student2.student_id,
    course_id: course2.course_id,
    enrollment_date: new Date(),
  });

  // Tạo Teaching Schedule cho 2 khóa học
  const scheduleCourse1 = await TeachingSchedule.create({
    teacher_id: teacher.teacher_id,
    class_id: class10A1.class_id,
    course_id: course1.course_id,
    date: new Date("2025-05-05"),
    lesson_period: "1-3",
    room: "A101",
  });

  const scheduleCourse2 = await TeachingSchedule.create({
    teacher_id: teacher.teacher_id,
    class_id: class10A1.class_id,
    course_id: course2.course_id,
    date: new Date("2025-05-19T13:30:00"),
    lesson_period: "4-6",
    room: "B202",
  });

  // Tạo điểm cho sinh viên
  await Grade.create({
    enrollment_id: enrollment1Course1.enrollment_id,
    grade: 8.5,
  });

  await Grade.create({
    enrollment_id: enrollment2Course1.enrollment_id,
    grade: 7.0,
  });

  await Grade.create({
    enrollment_id: enrollment1Course2.enrollment_id,
    grade: 9.0,
  });

  await Grade.create({
    enrollment_id: enrollment2Course2.enrollment_id,
    grade: 6.5,
  });

  // Tạo Attendance (Điểm danh)
  await Attendance.bulkCreate([
    // Điểm danh cho Student One
    {
      enrollment_id: enrollment1Course1.enrollment_id,
      schedule_id: scheduleCourse1.schedule_id,
      attendance_date: new Date(),
      status: "present",
    },
    {
      enrollment_id: enrollment1Course2.enrollment_id,
      schedule_id: scheduleCourse2.schedule_id,
      attendance_date: new Date(),
      status: "absent",
    },

    // Điểm danh cho Student Two
    {
      enrollment_id: enrollment2Course1.enrollment_id,
      schedule_id: scheduleCourse1.schedule_id,
      attendance_date: new Date(),
      status: "absent",
    },
    {
      enrollment_id: enrollment2Course2.enrollment_id,
      schedule_id: scheduleCourse2.schedule_id,
      attendance_date: new Date(),
      status: "present",
    },
  ]);

  console.log("✅ Seed thành công!");
}

seed().catch((err) => {
  console.error("❌ Seed thất bại:", err);
  process.exit(1);
});
