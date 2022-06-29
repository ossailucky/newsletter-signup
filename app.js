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

    const url = "https://us13.api.mailchimp.com/3.0/lists/aeff461ebe"

    const options ={
        method: "POST",
        auth: "ossai1:65eb50a2689f051df5f1663dd7c09c2b-us13"
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

// api key
//65eb50a2689f051df5f1663dd7c09c2b-us13

//audience id
//aeff461ebe