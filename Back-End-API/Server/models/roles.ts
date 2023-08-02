// Step 1 - import mongoose - database adapter

import mongoose, { Schema, Document } from 'mongoose';



interface IRoles extends Document {
    name: string;
   
  }
  


// Step 2 - Create a Schema that matches the data in the collection
const RoleSchema: Schema<IRoles> = new Schema
({

        name: {
        type: String,
        require: true   }
  
})

// Step 3- Create a Model using the Schema

const Model = mongoose.model<IRoles>("Roles", RoleSchema);
//module.exports = mongoose.model("Role", RoleSchema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;