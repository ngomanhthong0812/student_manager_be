import sequelize from "../src/db/connection";
import "../src/models";

sequelize
  .sync({ alter: true }) // hoặc { force: true } nếu muốn xóa toàn bộ rồi tạo lại
  .then(() => {
    console.log("✅ Database synced!");
    process.exit(0); // Thoát sau khi sync xong
  })
  .catch((err) => {
    console.error("❌ Sync failed:", err);
    process.exit(1);
  });
