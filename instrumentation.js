//The purpose of this file is to allow the the database be connected automatically when the app starts
import connect from "./app/database/dbConnect";

export async function register() {
  await connect();
}
