import express from "express"
import bodyParser from "body-parser"
import request from "request"
import path from "path"
import https from "https"

const __dirname = path.resolve();


const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/signUp.html"));

})

app.post("/", (req,res)=>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)

    const url = "url list id"

    const options ={
        method: "POST",
        auth: "ossai1:apikey"
    }
  const request =  https.request(url,options,(response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end();

})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})

