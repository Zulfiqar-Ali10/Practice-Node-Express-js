import express from "express";
import morgan from "morgan";
import userRoutes from './routers/users.js'
import 'dotenv/config'
import mongoose from "mongoose";

const app = express();
const PORT = 4000;

// console.log(process.env.MONGODBBURI);


/////////////morgan middleware //

app.use(morgan('tiny'));
app.use(express.json());

/////////////morgan middleware //


///////// connect mongodb code.////

mongoose.connect(process.env.MONGODBBURI).then(()=>{
    console.log("Mongodb Connect");
}).catch((err) => { console.log("error=>", error)}
)
///////// connect mongodb code.////


const tasks = [
    {
        id: 1,
        task: "Sona nahn he",
        completed: true,
    },
    {
        id: 2,
        task: "Jagna he",
        completed: false,
    },
    {
        id: 3,
        task: "Concept samjna he",
        completed: true,
    },
]
//////////// application level middleware /

// function middleware(req, res, next){
//     // console.log("Middleware", Date.now());
//     req.requestBy = "Zulfiqar Ali";
//     next();

// }

// app.use(middleware);
//////////// application level middleware /

app.get('/', (req, res) => {
    console.log("req", req.requestBy);
    // res.status(500).send("System ma masla hogaya hai Ali")
    res.status(200).send(tasks)
})

app.use('/user', userRoutes);

// app.post('/', (req, res) => {
//     console.log("req", req.body);
//     res.send("Hello World Post Api is running!!")  
// })


// app.put('/', (req, res) => {
//     // console.log("req", req);
//     res.send("Hello World Put Api is running!!")  
// })

// app.delete('/', (req, res) => {
//     // console.log("req", req);
//     res.send("Hello World Delete Api is running!!")  
// })


///////// params ....../////////
app.get("/singleTask/:id", (req, res) => {

    const task = tasks.find((data) => data.id == req.params.id);
    if (!task) {
        return res.status(404).send("Task Not Found");
    } else {
        res.status(200).send(task);
    }

})

///////// params ....../////////


///////// query ....../////////

app.get('/', (req, res) => {
    const { completed } = req.query;
    let filter = tasks;
    if (completed)
        filter = tasks.filter((data) => completed == "true" ? data.completed == true : data.completed == false);
    res.status(200).send(filter);
});

///////// query ....../////////

app.listen(PORT, () => {
    console.log("Server is running on Port" + PORT)
});
