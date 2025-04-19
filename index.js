const express = require('express');
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const path = require("path");
const app = express();
const port = 8080;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data
app.use(express.static('public')); //tells your Express app to serve static files from the public folder
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // looks for ?_method=PUT or a hidden input
app.set("views", path.join(__dirname, "views")); // this sets the views directory
app.set("view engine", "ejs"); // this sets ejs as the view engine



main().then((res)=>{
    console.log(`connection successful`);
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1 = new chat ({
//   from: "neha",
//   to: "priya",
//   message: "let me sleep",   
//   created_at: new Date(),
// })
// chat1.save().then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// })


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/chats",async(req,res)=>{
  let chats = await Chat.find();
  // console.log(chats);
  // res.send("working"); 
  res.render("index.ejs", {chats})
})
app.post("/chats",async(req,res)=>{
  let {from, to, message} = req.body;
  let newchat = new Chat({
    from: from,
    to : to,
    message: message,
    created_at: new Date(),
  })
//  console.log(newchat);
newchat.save().then((res)=>{
  console.log("new chat is saved");
}).catch((err)=>{
  console.log(err);
})
//  res.send("working");
res.redirect("/chats");
})
app.get("/chats/new",async(req,res)=>{ 
  res.render("new.ejs");
})
app.get("/chats/:id/edit",async(req,res)=>{ 
  let {id} = req.params;
  let chat = await Chat.findById(id);
  console.log(chat);
  res.render("edit.ejs",{chat});
  // res.send("found");
})
app.put("/chats/:id",async(req,res)=>{
  let {id} = req.params;
  let {message:newMsg} = req.body;
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(id,{message:newMsg}, {runValidators:true,new:true})
  console.log(updatedChat);
  res.redirect("/chats");
});
app.delete("/chats/:id",async(req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})