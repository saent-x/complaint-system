const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authentication = require("./routes/authentication");
const complaintsemantics = require("./routes/complaintsemantics");
const followupsemantics = require("./routes/followupsemantics");
require('dotenv').config()

// Connect Database
mongoose
	.connect(`mongodb+srv://admin:${process.env.PASSWORD}@cluster0.fmzyaje.mongodb.net/complaint-db?retryWrites=true&w=majority`, {
		useNewUrlParser: true
	})
	.then(() => console.log("db connected."))
	.catch(err => console.log(err));

// Initializations
const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Middleware Routes
app.use("/api/auth", authentication);
app.use("/api/comp", complaintsemantics);
app.use("/api/foll", followupsemantics);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}...`));
