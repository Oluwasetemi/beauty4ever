import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

async function main() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "beauty4ever",
  });

  const db = drizzle(connection);
  console.log(db);
}

main();
