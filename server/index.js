const express = require("express")
const cors = require("cors");
const tasks = require("./routes/task");

require("./db")
const app = express();
app.use(cors(
    {
        origin: ["https://main-kanban.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json());
app.use("/api/tasks",tasks);

app.listen(8000, () => {
    console.log("the server is listening at port 8000");
})
