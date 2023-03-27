const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
const mongoURI ="mongodb+srv://user:user@cluster0.qkatinj.mongodb.net/CollegeFun?retryWrites=true&w=majority";
const connectToMongo = () => {
   mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    () => {
      console.log("connected to mongodb successfully");
    }
  );
};

module.export = connectToMongo();
