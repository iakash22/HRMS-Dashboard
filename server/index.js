const express = require('express');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.json({ message: "Server Runs perfectly!" });
})

app.listen(PORT, () => console.log(`Server Listen on port ${PORT}`));