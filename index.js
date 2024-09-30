const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("./listing.js")


// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const dbUrl = process.env.BASE_URL;

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

const initDB =  async () => {
    // delete all listings in the database
    await Listing.deleteMany({});
   initData.data = initData.data.map((obj) =>({...obj,owner: "661b63a04dc1cf5cd84c32d8",}));

    // insert all listings from the data.js file
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();