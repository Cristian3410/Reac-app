import  express  from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import RoutesValidate from "./routes/rutas.js"


const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false
    })
  );


app.use(RoutesValidate)


export default app