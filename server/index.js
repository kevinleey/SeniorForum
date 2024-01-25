const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// test server endpoint
app.get("/test", (req, res) => {
    res.send("Hello world! - from Express");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});