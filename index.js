const express = require("express")
const users = require("./MOCK_DATA.json")
const app = express()
const fs = require('fs')
const port = 9000

//middleware - plugin
app.use(express.urlencoded({extended: false}));

//Routes

app.get('/users',(req, res)=>{
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join(" ")}
    </ul>
    `;
    res.send(html)
})

//get all
app.get('/api/users',(req, res)=>{
    return res.json(users);
});

//get by id
// app.get('/api/users/:id',(req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return res.json(user);
// });

app
.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req, res) => {
    return res.json({status:"Pending"});
})
.delete((req, res) => {
    return res.json({status:"Pending"});
});

app.post('/api/users', (req, res)=>{
    const body  = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{

        return res.json({status:"Successfully Added", id: users.length +1 })


    })
})



app.listen(port, ()=> console.log("Server started at port 9000"))

