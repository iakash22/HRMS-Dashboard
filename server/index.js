const express = require('express');
require('dotenv').config({ path: './.env' });
const cors = require("cors");
const cloudinaryConnect = require('./configs/cloudinary');
const dbConnect = require('./configs/dbConnect');
const { corsOptions } = require('./configs/corsOptions');
const routes = require('./routers');

const app = express();
const PORT = process.env.PORT || 5000;

cloudinaryConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api/v1/auth', routes.authRoutes);
app.use('/api/v1/candidate', routes.candidateRoutes);
app.use('/api/v1/employee', routes.employeeRoutes);
app.use('/api/v1/attendance', routes.attendanceRoutes);
app.use('/api/v1/leave', routes.leaveRoutes);

// app.get('/', (req, res) => {
//     res.json({ message: "Server Runs perfectly!" });
// })

app.listen(PORT, () => console.log(`Server Listen on port ${PORT}`));
dbConnect();
