const mongoose = require("mongoose");
const uri = "mongodb+srv://rishabhbilwal:Ep09YPt9hx36z0fi@cluster0.8kiju.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
.then(() => {
    console.log("db is connected");
}).catch((err) => {
    console.log("db is failed",err);
})