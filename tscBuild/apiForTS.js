"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dboperationsForTS_1 = require("./dboperationsForTS");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", router);
router.use((req, res, next) => {
    console.log("middleware");
    next();
});
router.route("/fruitlists").get((req, res) => {
    (0, dboperationsForTS_1.getFruitListResult)(req.query)
        .then((result) => {
        // console.log("connection sucessed ")
        console.log(result);
        res.json(result);
    })
        .catch((error) => {
        console.log(error);
    });
});
// router.route("/fruitlists/:id").get((req, res) => {
//   getFruitListResultFromId(req.params.id).then(result => {
//     res.json(result);
//     console.log(result);
//   });
// });
router.route("/fruitlists").post((req, res) => {
    (0, dboperationsForTS_1.addFruitItem)(req.body).then(() => {
        console.log(req.body);
        res.send("created successfully");
    });
});
router.route("/fruitlists/:id").delete((req, res) => {
    (0, dboperationsForTS_1.deleteFruit)(req.params.id).then(() => {
        console.log(req.params.id);
        res.send("Deleted successfully");
    });
});
const port = process.env.PORT || 8090;
app.listen(port);
console.log("fruitlists API is running at " + port);
