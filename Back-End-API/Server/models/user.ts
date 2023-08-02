// user.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
// @ts-ignore
import passportLocalMongoose from 'passport-local-mongoose';

export interface IUser extends Document {
    displayName: string;
    username: string;
    emailAddress: string;
    role: mongoose.Types.ObjectId;
}

export interface IUserModel extends Model<IUser> {
    register(user: IUser, password: string, cb: (error: any, user?: IUser) => void): void;
}

const UserSchema = new Schema<IUser>({
    displayName: String,
    username: String,
    emailAddress: String,
    role: { type: Schema.Types.ObjectId, ref: 'Roles', required: true }
},{
    timestamps: true,
  
});

UserSchema.plugin(passportLocalMongoose);

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', UserSchema);

export default User;
