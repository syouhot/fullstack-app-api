import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { env } from "./env.js"
import * as schema from "../db/schema.js"


const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql, schema)


