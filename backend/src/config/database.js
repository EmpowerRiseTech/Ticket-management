import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,    
  process.env.DB_USER,    
  "",                     // MySQL password (replace with your actual password)
  {
    host: process.env.DB_HOST || "localhost", 
    dialect: "mysql",                         
    port: process.env.DB_PORT || 3306,        
    logging: false,                            // Disable logging SQL queries
  }
);


(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected with Sequelize.");
    await sequelize.sync();

    console.log("All models synced!");
  } catch (error) {
    console.error("MySQL Connection Error:", error);
  }
})();

export default sequelize;
