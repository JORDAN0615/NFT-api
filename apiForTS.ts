import { getFruitListResult, addFruitItem, deleteFruit  } from "./dboperationsForTS";
import express, {Express,query,Request,Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app:Express = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

interface req {
  query: {
    name: string;
    quantityMoreThan: number;
    quantityLessThan: number;
    id: number;
  }
}

router.route("/fruitlists").get((req: req, res) => {
    getFruitListResult(req.query)
    .then((result: any) => {
      // console.log("connection sucessed ")
      console.log(result);
      res.json(result);
    })
    .catch((error: any) => {
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
  addFruitItem(req.body).then(() => {
    console.log(req.body);
    res.send("created successfully");
  });
});

router.route("/fruitlists/:id").delete((req, res) => {
  deleteFruit(req.params.id).then(() => {
    console.log(req.params.id);
    res.send("Deleted successfully");
  });
});

const port = process.env.PORT || 8090;
app.listen(port);
console.log("fruitlists API is running at " + port);