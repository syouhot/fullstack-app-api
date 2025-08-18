import { env } from "./src/config/env";

export default {
    schema: "./src/db/schema.js",
    out: "./src/db/migrations",
    dialect:"postgresql",
    dbCredentials:{
        url: env.DATABASE_URL
    }
}

//npx drizzle-kit generate //生成sql文件
//npx drizzle-kit migrate //仓库生成sql表格