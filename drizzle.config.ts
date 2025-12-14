import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("DATABASE_URL environment variable is required");
}

// Add sslmode=require to connection string if not present for cloud DBs
const connectionString = databaseUrl.includes("sslmode=")
	? databaseUrl
	: `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}sslmode=require`;

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: connectionString,
	},
	verbose: true,
	strict: true,
});
