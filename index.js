const express = require("express");
const Jwt = require("jsonwebtoken")
const app = express();
const secretKey="secretKey"

app.get("/", (req, resp) => {

    resp.send({ message: "jwt authen an autho" })

})

app.post("/login", (req, resp) => {
    const user = {
        id: 1,
        username: "anil",
        email: "anil@gmail.com",
    }

    Jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
        
        resp.json({token})
    })
})


app.post("/profile", verifyToken, (req, resp) => {

    Jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            resp.send({ result:"invalid token"})
        } else {
            resp.json({
                message:"profile accessed ",authData
            })
        }
    })
})



function verifyToken(req, resp, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {

        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();

    } else { 
        resp.send({result:"token is not valid"})
    }
    
}


app.listen(8000, () => {
    console.log("app is running on http://localhost:8000 port");
});