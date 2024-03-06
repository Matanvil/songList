const app = require("./app");
const { pool, checkSongsTable, createSongsTable } = require("./utils/db");

const PORT = 4000;

(async () => {
  try {
    const tableExists = await checkSongsTable();
    if (!tableExists) {
      await createSongsTable();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
})();
