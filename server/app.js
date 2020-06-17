var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors')
var dotenv = require('dotenv')
const Employee = require("./models/employee")

dotenv.config();
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true
}

// const connectWithRetry = () => {
//     console.log('MongoDB connection with retry')
//     mongoose.connect(process.env.MONGO_LOC, options).then(() => {
//         console.log('MongoDB is connected')
//     }).catch(err => {
//         console.error(err);
//         console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
//         setTimeout(connectWithRetry, 5000)
//     })
// }

console.log(process.env.MONGO_LOC)
mongoose.connect(process.env.MONGO_LOC, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.set('useFindAndModify', false);


var app = express();
app.use(cors())
var corsOptions = {
    origin: 'http://localhost:4200/loc',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/add', async(req, res) => {
    const {body} = req;
    console.log(body)
    if(!body.emp_id || !body.first_name || !body.last_name || !body.phone || !body.department || !body.position){
        console.log("invalid employee details!");
        res.status(400).json({error: "Invalid employee details"});
        return;
    }
    let new_employee = Employee(body);
    await new_employee.save((err) => {
        if(err){
            console.log(err);
            res.json({message: "Employee already exists!"});
            return;
        }
    })
    return res.status(200).json({message: 'Employee added successfully!'})
})

app.post('/update', async(req, res) => {
    const {body} = req;
    console.log(body)
    const update = {
        phone: body.phone,
        address: body.address,
        appraisal: body.appraisal,
        department: body.department,
        salary: body.salary,
        position: body.position,
        email: body.email
    }
    var objectId = mongoose.Types.ObjectId(body._id);

    await  Employee.findByIdAndUpdate({_id:objectId}, update, {new:true}, (err) => {
        if(err){console.log(err);
        res.json({ message: "Error updating data" });
        return;}
        else{
            res.status(200).json({ message: "Employee details updated successfully!" });
            return;
        }
    })
 
    
})

app.post('/delete', async(req, res) => {
    const {body} = req;
    //body will have employee id, and _id.
    if(!body.id){
        res.status(401).json({error:"No user selected!"});
        return;
    }
    await Employee.remove({_id:body.id}, {justone: true}, (err) => {
        if(err){
            res.send(400).send({error : "Error deleting employee"});
            return;
        }
        else{
            res.status(200).send({message: "Employee record deleted successfully!"})
        }
    })
})

app.get('/getall', async(req,res) => {
    await Employee.find().then(employees => res.send(employees)).catch((err) => {
        res.status(400).send({error: "Error getting employees"})
    })
})

app.post('/getone', async(req, res) => {
    const {body} = req;
    console.log(body)
    if (!body.id) {
        res.status(401).json({ error: "No user selected!" });
        return;
    }
    else {  await Employee.find({_id : body.id}).then(emp => {
        res.send(emp)
        return
    }).catch(err => {
        console.log(err)
    })}

})





app.listen(3000);
console.log("Connect to http://127.0.0.1:3000/");