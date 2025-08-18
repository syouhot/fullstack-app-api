import express from "express"
import { env } from "./config/env.js"
import { db } from "./config/db.js"
import { favoritesTable } from "./db/schema.js"
import { and, eq } from "drizzle-orm"
const app = express()

app.use(express.json())
const POST = env.POST || 5001

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true })
})
app.post("/api/favorites", async (req, res) => {
    try {
        const { useId, recipeId, title, image, cookTime, servings } = req.body;
        if (!useId || !recipeId || !title) {
            return res.status(400).json({ error: "缺少必填字段" })
        }
        const newFavorite = await db.insert(favoritesTable).values({
            useId, recipeId, title, image, cookTime, servings
        }).returning()
        return res.status(201).json(newFavorite[0])
    } catch (error) {
        console.log("添加收藏错误", error);
        res.status(500).json({ error: "内部错误" });

    }
})

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
    try {
        const { userId, recipeId } = req.params
        if (!userId || !recipeId) {
            return res.status(400).json({ error: "缺少必填字段" })
        }
        await db.delete(favoritesTable).where(and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId))))
        return res.status(200).json({ message: "删除成功" })
    } catch (error) {
        console.log("删除收藏错误", error);
        res.status(500).json({ error: "内部错误" });
    }
})

app.get("/api/favorites/:userId", async (req, res) => { 
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({ error: "缺少必填字段" })
        }
        const favorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId, userId))
        return res.status(200).json(favorites)
    } catch (error) {
        console.log("获取收藏错误", error);
        res.status(500).json({ error: "内部错误" });
    }
})


app.listen(POST, () => {
    console.log("链接成功！", POST)
})