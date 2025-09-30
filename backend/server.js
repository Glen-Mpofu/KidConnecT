const express = require("express");
const {Pool} = require("pg");  
require("dotenv").config();

const app = express();

//password encryption
const bcrypt = require("bcrypt");

//enabling Cross Origin Resurce Sharing for the app to run on web
const cors = require("cors");
app.use(cors({
    origin: "*"
}))

app.use(express.json()) // allows for JSON passing

//connecting to the db
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// Test connection
pool.query('SELECT version();')
  .then((res) => {
    console.log('Database connected successfully');
    console.log('Version '+ res.rows[0].version);
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

module.exports = pool;

// MY SCHEMAS
const createGuardianTableQuery = 
`CREATE TABLE IF NOT EXISTS Guardian(
    Name VARCHAR(15), 
    Surname VARCHAR(15), 
    Age INTEGER, 
    Email VARCHAR(100) UNIQUE PRIMARY KEY, 
    Password VARCHAR(10) NOT NULL
);`
;

// adding the schema to the database
pool.query(createGuardianTableQuery).
then(() => console.log("Table Created")).
catch(() => console.log("Table Exists"))

app.post("/register", async (req, res) => {
    console.log(req.body);
    //getting the data sent from the frontend
    const { name, surname, age, email, password } = req.body;

    //checking whether the specified guardian exists in the db or not
    const oldGuardian = await pool.query("SELECT * FROM GUARDIAN WHERE EMAIL = "+email)
    if(oldGuardian.rowCount != 0)
    {
        return res.send({status: "error", data: "Guardian Already Has An Account"})
    }

    //encrypting the database
    const encryptPassword = await bcrypt.hash(password, 10)

    const userData = name+", "+surname+", "+age+", "+email+", "+password
    //inserting the user
    pool.query(
        `INSERT INTO Guardian(
            NAME, SURNAME, AGE, EMAIL, PASSWORD
        )
        VALUES( ` + userData + `)    
        ;`
    ).then(()=> console.log("Guardian Account Created")).
    catch((e) => console.log(e))

    res.send({status: "ok", data: "Guardian Created"})
})

//starting the server
const port = process.env.PORT
app.listen(port, () => console.log("Listening to port "+port))
