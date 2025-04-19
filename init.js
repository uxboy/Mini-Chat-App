const mongoose = require('mongoose');
const chat = require("./models/chat.js");
main().then((res)=>{
    console.log(`connection successful`);
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allchats= [
    
        {
            from: "neha",
            to: "priya",
            message: "let me sleep",   
            created_at: new Date(),
        },        {
            from: "simba",
            to: "riya",
            message: "let me sleep",   
            created_at: new Date(),
        },
        {
            from: "rohit",
            to: "jaya",
            message: "let me sleep",   
            created_at: new Date(),
        },        {
            from: "petni",
            to: "sakchunni",
            message: "let me sleep",   
            created_at: new Date(),
        },
        {
            from: "ramu",
            to: "sanjeev",
            message: "let me sleep",   
            created_at: new Date(),
        }
    
]
// let allchats = new chat ()
// allchats.save().then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// })
chat.insertMany(allchats);