import express from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import { validateErrorMiddleware } from "./middleware/validator.js"

const port = 8090
const app = express()

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}))

app.use(
    cors({ origin: true })
)
app.use(express.json())

import docsRouter from "./middleware/swagger-doc.js";
app.use(docsRouter)

import activitiesController from "./controllers/activities.js"
app.use(activitiesController)
import blog_postsController from "./controllers/blog_posts.js"
app.use(blog_postsController)
import bookingsController from "./controllers/bookings.js"
app.use(bookingsController)
import classesController from "./controllers/classes.js"
app.use(classesController)
import roomsController from "./controllers/rooms.js";
app.use(roomsController)
import staffController from "./controllers/staff.js";
app.use(staffController)

app.use(validateErrorMiddleware)

app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}`)
}) 