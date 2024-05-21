import mongoose from 'mongoose';
import config from './config';
import app from './app';



const main = async () => {
   try {
      await mongoose.connect(config.dbUrl as string)
      app.listen(config.PORT, () => {
         console.log(`Listening on port ${config.PORT}`)
      })
   } catch (error) {

   }
};

main();