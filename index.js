const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { prediction: null });
});

app.post("/predict", async (req, res) => {
    try {
        const inputData = [{
            culmen_length_mm: parseFloat(req.body.culmen_length_mm),
            culmen_depth_mm: parseFloat(req.body.culmen_depth_mm),
            flipper_length_mm: parseFloat(req.body.flipper_length_mm),
            body_mass_g: parseFloat(req.body.body_mass_g),
            island_Dream: req.body.island_Dream === "true",
            island_Torgersen: req.body.island_Torgersen === "true",
            sex_MALE: req.body.sex_MALE === "true"
        }];

        const response = await axios.post(
            "http://127.0.0.1:4444/predict",
            inputData
        );

        const result = response.data.prediction[0];

        res.render("index", { prediction: result });

    } catch (error) {
        console.error(error.message);
        res.render("index", { prediction: "Error occurred" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
