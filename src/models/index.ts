import User from "./user.model";
import Class from "./class.model";
import Student from "./student.model";
import Teacher from "./teacher.model";
import Course from "./course.model";
import Enrollment from "./enrollment.model";
import Grade from "./grade.model";
import Attendance from "./attendance.model";
import TeachingSchedule from "./teaching-schedule.model";

export const applyAssociations = () => {
  // User - Student (1-1)
  Student.belongsTo(User, { foreignKey: "user_id", as: "user" });
  User.hasOne(Student, { foreignKey: "user_id", as: "student" });

  // User - Teacher (1-1)
  Teacher.belongsTo(User, { foreignKey: "user_id", as: "user" });
  User.hasOne(Teacher, { foreignKey: "user_id", as: "teacher" });

  // Student - Class (N-1)
  Student.belongsTo(Class, { foreignKey: "class_id", as: "class" });
  Class.hasMany(Student, { foreignKey: "class_id", as: "students" });

  // Teacher - Course (1-N)
  Teacher.hasMany(Course, { foreignKey: "teacher_id", as: "courses" });
  Course.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });

  // Class - Course (1-N)
  Class.hasMany(Course, { foreignKey: "class_id", as: "courses" });
  Course.belongsTo(Class, { foreignKey: "class_id", as: "class" });

  // Course - Enrollment (1-N)
  Course.hasMany(Enrollment, { foreignKey: "course_id", as: "enrollments" });
  Enrollment.belongsTo(Course, { foreignKey: "course_id", as: "course" });

  // Student - Enrollment (1-N)
  Student.hasMany(Enrollment, { foreignKey: "student_id", as: "enrollments" });
  Enrollment.belongsTo(Student, { foreignKey: "student_id", as: "student" });

  // Enrollment - Grade (1-1)
  Enrollment.hasOne(Grade, { foreignKey: "enrollment_id", as: "grade" });
  Grade.belongsTo(Enrollment, {
    foreignKey: "enrollment_id",
    as: "enrollment",
  });

  // Attendance - Enrollment (N-1)
  Attendance.belongsTo(Enrollment, {
    foreignKey: "enrollment_id",
    as: "enrollment",
  });
  Enrollment.hasMany(Attendance, {
    foreignKey: "enrollment_id",
    as: "attendances",
  });

  // Attendance - TeachingSchedule (N-1)
  Attendance.belongsTo(TeachingSchedule, {
    foreignKey: "schedule_id",
    as: "schedule",
  });
  TeachingSchedule.hasMany(Attendance, {
    foreignKey: "schedule_id",
    as: "attendances",
  });

  // TeachingSchedule - Teacher (N-1)
  TeachingSchedule.belongsTo(Teacher, {
    foreignKey: "teacher_id",
    as: "teacher",
  });
  Teacher.hasMany(TeachingSchedule, {
    foreignKey: "teacher_id",
    as: "schedules",
  });

  // TeachingSchedule - Course (N-1)
  TeachingSchedule.belongsTo(Course, { foreignKey: "course_id", as: "course" });
  Course.hasMany(TeachingSchedule, {
    foreignKey: "course_id",
    as: "schedules",
  });

  // TeachingSchedule - Class (N-1)
  TeachingSchedule.belongsTo(Class, {
    foreignKey: "class_id",
    as: "class",
  });
  Class.hasMany(TeachingSchedule, {
    foreignKey: "class_id",
    as: "schedules",
  });
};

applyAssociations();

export {
  User,
  Class,
  Student,
  Teacher,
  Course,
  Enrollment,
  Grade,
  Attendance,
  TeachingSchedule,
};
