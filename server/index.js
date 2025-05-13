const express = require('express')
require('dotenv').config()
const app = express()
const cors = require("cors")
const mongoose = require("mongoose");
const port = 4000



//********* Middleware's Starts Heree *********//

app.use(cors())
app.use(express.json())


//********* Middleware's Ends Here *********//




//********* Database Connection Here *********//



mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', () => {
    console.log("database connected");
})

// disable auto pluralize
mongoose.pluralize(null);

//********* Database Connection Ends Here *********//

// payment method start here

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox



//************   All APi's Starts   ************************//


// ---------Payment Method APi's starts ------------

//article api's starts--------
app.get("/api/v1/articles", async (req, res) => {
    const result = await getArticleData();
    res.send(result)
})

app.get("/api/v1/articles/:id", async (req, res) => {
    const id = req.params.id
    const result = await getArticleSingleData(id)
    res.send(result)
})
//article api's ends--------



//Monthly Picks Api's starts------
app.get("/api/v1/monthlyPicks", async (req, res) => {
    const result = await getMonthlyData();
    res.send(result);
})

app.get("/api/v1/monthlyPicks/:id", async (req, res) => {
    const id = req.params.id
    const result = await getMonthlySigleData(id)
    res.send(result)
})

app.get("/api/v1/monthlyPicksData/:author", async(req,res) =>{
    const name = req.params.author;

    const result = await  getMonthlyAuthorWiseData(name);
    res.send(result);
})

app.post("/api/v1/monthlyPicks", async(req,res)=>{
    const data = req.body;
    console.log(data);
    const result = await addMonthlyPicks(data);
    res.send(result);
})


//Monthly Picks Api's ends------



//News Stories Api's starts ------
app.get("/api/v1/newStories", async (req, res) => {
    const result = await getNewStories();
    res.send(result);
})

app.get("/api/v1/newStories/:id", async (req, res) => {
    const id = req.params.id
    const result = await getSingleStory(id)
    res.send(result)
})


app.get("/api/v1/stories/:author", async(req,res)=>{
    const name = req.params.author;
    const result = await getAuthorWiseStory(name);
    res.send(result);
})

app.post("/api/v1/addStories", async(req,res)=>{
    const data = req.body;
    const result = await addStory(data);
    res.send(result);
})

//News Stories Api's ends ------




//Spotlight Api's starts------
app.get("/api/v1/spotlight", async (req, res) => {
    const result = await getSpotlightData();
    res.send(result);
})

app.get("/api/v1/spotlight/:id", async (req, res) => {
    const id = req.params.id
    const result = await getSpotlightSingleData(id)
    res.send(result)
})
//Spotlight Api's ends------


// Category Api's ends--------




// book collection api's starts------
app.get("/api/v1/books/:id", async (req, res) => {
    const id = req.params.id
    const result = await getBookData(id)
    res.send(result)
})
// book collection api's ends------




// cart api's starts--------
app.get("/api/v1/cart/:id", async (req, res) => {
    const id = req.params.id
    const result = await getCartData(id)
    res.send(result)
})

app.get("/api/v1/cart", async (req, res) => {
    const id = req.params.id
    const result = await getCartAllData()
    res.send(result)
})

app.post("/api/v1/cart", async (req, res) => {
    const sendProduct = req.body
    const result = await postCartData(sendProduct);
    res.send(result)
})

app.delete("/api/v1/cart/:id", async(req, res)=>{
    const id = req.params.id ;
    const result = await deleteCartData(id)
    res.send(result)
})

// cart api's ends--------




//tips api starts-------
app.get("/api/v1/tips", async (req, res) => {
    const result = await getTipsData()
    res.send(result)
})
//tips api ends-------


 
   


//Forum Ends here



//*********   Common api's here   ************************//

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



//*********   Common api's ends here   ************************//