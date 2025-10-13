const express = require("express");
const session = require("express-session") // npm install express-session
const jwt = require("jsonwebtoken")

const {Pool} = require("pg");  
require("dotenv").config();
const { nanoid } = require("nanoid")

const app = express(); 

// allowing our express api to use sessions to save user data when they are logged in
app.use(session({
    secret: "kidconnectsession1", /*
        string used to sign the session id cookie. 
        signing prevents clients from tampering with their session id. 
        should be long, random and kept secret
    */
    resave: false,
    saveUninitialized: false,
    /*
        controls whether a new but unmodified session is saved
        false to delete it if no data has been set to it
    */
    cookie: {
        secure: false,
        /*
            true sends the cookie over HTTPS and false over HTTP
        */
        maxAge: 1000 * 60 * 60 * 24 // 1 day alive
    },
    rolling: true // resets the session when the user sends a request
}));

//password encryption
const bcrypt = require("bcrypt");

//enabling Cross Origin Resurce Sharing for the app to run on web
const cors = require("cors");

app.use(cors({
    origin: ["http://localhost:8081", "http://192.168.137.1:8081"], 
    credentials: true
}))

app.use(express.json()) // allows for JSON passing

const JWT_SECRET = process.env.JWT_SECRET
//connecting to the db
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
//starting the server
const port = process.env.PORT
app.listen(port, () => console.log("Listening to port "+port))

// Test connection
pool.query('SELECT version();')
  .then((res) => {
    console.log('Database connected successfully');
    console.log('Version '+ res.rows[0].version);
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });


// GUARDIAN SCHEMAS
const createGuardianTableQuery = 
`CREATE TABLE IF NOT EXISTS Guardian(
    Name VARCHAR(15), 
    Surname VARCHAR(15), 
    Age INTEGER, 
    Email VARCHAR(100) UNIQUE NOT NULL, 
    Password VARCHAR(100) NOT NULL,
    id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);`
;

// method for getting a guardian
async function getGuardian(email) {
    const result = await pool.query(
        `
            SELECT * FROM GUARDIAN WHERE EMAIL = $1 
        `,
        [email]
    )
    if(result.rowCount != 1){
        return {status: "error", data: "No such guardian"};
    }

    console.log(result.rows[0])
    return {status: "ok", data: result.rows[0]};
}

// method for getting a code
async function getCode(code) {
    const result = await pool.query(
        `
            SELECT * FROM TRACK_CODES WHERE CODE = $1
        `,
        [code]
    );

    if(result.rowCount != 1){
        return { status: "error", data: "Code not found" }
    }

    console.log(result.rows[0])
    return { status: "ok", data: result.rows[0] }
}

// adding the schema to the database
pool.query(createGuardianTableQuery).
then(() => console.log("Table Created")).
catch(() => console.log("Table Exists"))

// CODE SCHEMA
pool.query(`
    CREATE TABLE IF NOT EXISTS TRACK_CODES
    (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(4) UNIQUE NOT NULL,
        guardian_id uuid REFERENCES GUARDIAN(id)
    )    
`)

//register logic
app.post("/register", async (req, res) => {
    console.log(req.body);
    //getting the data sent from the frontend
    const { name, surname, age, email, password } = req.body;
    const intAge = parseInt(age)
    //checking whether the specified guardian exists in the db or not
    const oldGuardian = await pool.query("SELECT * FROM GUARDIAN WHERE EMAIL = $1", [email])
    if(oldGuardian.rowCount != 0)
    {
        return res.send({status: "error", data: "Guardian Already Has An Account"})
    }

    //encrypting the database
    const encryptPassword = await bcrypt.hash(password, 10)

    const userData = [name, surname, intAge, email, encryptPassword]
    //inserting the user
    pool.query(
        `INSERT INTO Guardian(
            NAME, SURNAME, AGE, EMAIL, PASSWORD
        )
        VALUES($1, $2, $3, $4, $5)    
        `, userData
    ).then(()=> console.log("Guardian Account Created")).
    catch((e) => console.log(e))

    res.send({status: "ok", data: "Guardian Created"})
})

//login logic
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);

    const checker = pool.query("Select EMAIL, PASSWORD FROM GUARDIAN WHERE EMAIL = $1", [email])
    if((await checker).rowCount <= 0){
        return res.send({ status : "account error", data: "Guardian Account Doesn't Exit. Please Create an Account"})
    }

    const row = (await checker).rows[0]
    const hashedPassword = row.password
    const comparison = await bcrypt.compare(password, hashedPassword)

    if(!comparison){
        return res.send({status: "password error", data: "Wrong Password"});
    }

    // SAVING USER INFO IN THE SESSION
    req.session.user = {email}
    console.log("Session Created: ", req.session)

    //creating a token
    const token = jwt.sign({email:email}, "SECRET_KEY", {expiresIn: "7d"})
    res.send({status: "ok", data: "Login Successful", token: token})
})

//password change
app.post("/forgot-password", async (req, res) => {
    console.log(req.body)
    const {email} = req.body

    const findUser = await pool.query("SELECT EMAIL FROM GUARDIAN WHERE EMAIL = $1", [email])
    if(findUser.rowCount <= 0){
        return res.send({status: "error", data: "User Not Found"})
    }

    //generating reset code npm install nanoid
    const resetCode = nanoid(5).toUpperCase();

    try {
       await sendEmail(
        email, 
        "Password Reset Request",
        `Your password reset code is: ${resetCode}`,
        `<p>Your password reset code is: <b>${resetCode}</b> </p>`
       )
        
        return res.send({status: "email sent", data: "Email Sent. Check your Gmail for the reset code"})
    } catch (error) {
        console.log(error)
        return res.send({status: "error", data: "Failed to send email"})    
    }
        
})

// Logout logic
app.post("/logout", async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send({status: "error", data: "Login Failed"});
        res.clearCookie("connect.sid");
        res.send({status: "ok", data: "Loggout Successful"})
    });
})

// sending session
app.get("/session", async (req, res) => {
    if(req.session.user){
        console.log(req.session.user)
        const e = req.session.user.email
        pool.query(`
                SELECT * FROM GUARDIAN WHERE EMAIL = $1
            `, [e]).
            then((result) => {
                //const {name, surname, age, email, password} = res.rows[0];
                res.send({ status: "ok", data:  result.rows[0]})
                console.log(res.rows[0])
            }).catch(err => {
                console.log(err)
            })
            
    }else{
        res.send({ status: "no-session"})
    }
})

// generating the code and saving it in the db
app.get("/generate-code", async (req, res) => {
    const code = nanoid(4)
    console.log(code)

    const email = req.session.user.email
    const guardian = getGuardian(email)

    const guardian_id = (await guardian).data.id
    // persisting the code to the db
    pool.query(`
        INSERT INTO TRACK_CODES(code, guardian_id)   
        VALUES($1, $2) 
    `,[code, guardian_id]).then((result) => {
        if(result.rowCount != 1){
            res.send({status: "error", data: "Failed to input the code. something happened"})
        }

        res.send({status: "ok", data: "Use the code to connect the child's device"})
    }).catch(err => {
        console.error(err)
        res.send({status: "error", data: err})
    })
})

// child add
app.post("/child_code", async (req, res) => {
    const childData = req.body
    console.log(childData)

    const result = await getCode(childData.code)
    if(result.status === "error"){
        return res.send({status: result.status, data: result.data})
    }
    console.log(result)
    res.send({status: "ok", data: "Code correct"})
})