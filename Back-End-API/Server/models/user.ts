import mongoose, {PassportLocalSchema} from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema
({

DisplayName: String,
username: String,
EmailAddress: String,
//role: { type: Schema.Types.ObjectId, ref: 'Roles', required: true },
role: String,

Created:
{
    type: Date,
    default: Date.now()
},
Updated:
{
    type: Date,
    default: Date.now()
}
},
{
    collection: "users"
});

declare global
{
    export type UserDocument = mongoose.Document &
    {
        username: String,
        EmailAddress: String,
        DisplayName: String,
        role:String,
       // role: mongoose.Types.ObjectId;
    }
}

// Plugin the passport local mongoose module
UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("User", UserSchema  as PassportLocalSchema);
export default Model;