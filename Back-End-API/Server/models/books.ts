import mongoose, { Schema, Document } from 'mongoose';


interface IBook extends Document {
    UserId: mongoose.Types.ObjectId;
    Name: String,
    Author: String,
    Sipnosis: String,
    Year: String,
    TotalPages: String,
    Edition: String,
    Publisher: String,
    cover:String


}


const BookSchema: Schema<IBook> = new Schema

({

    Name: { type: String, require: true },
    Author: { type: String, require: true },
    Sipnosis: { type: String, require: true },
    Year: { type: String, require: true },
    TotalPages: { type: String, require: true },
    Edition: { type: String, require: true },
    Publisher: { type: String, require: true },
    cover: { type: String, require: true },
    UserId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    

})

const Model = mongoose.model<IBook>("Books", BookSchema);

export default Model;



