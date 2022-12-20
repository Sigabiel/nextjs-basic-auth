import Account from "./Account";
import {MongoClient, ObjectId} from "mongodb";
import clientPromise from "../Mongodb";
import bcrypt from "bcryptjs";
import Roles from "./Roles";
import {decode, verify} from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET;
const collectionName = "accounts";

export default class AccountHandler {
    async verifyCredentials(username:string, password:string) {
        const col = await getCollection();

        const account:Account = await col.findOne({username}) as any;
        if (!account || !await bcrypt.compare(password, account.password)) {
            return undefined;
        }

        return account;
    }

    async createAccount(username:string, password:string) {
        if (process.env.NODE_ENV != "development") {
            console.log("Not in development mode, not creating account!");
            return undefined;
        }

        const col = await getCollection();
        const hash = await bcrypt.hash(password, 10);
        const account:Account = {
            username,
            password: hash,
            role: Roles.admin.id,
        }

        const feedback = await col.insertOne(account as any);
        return await col.findOne({_id: new ObjectId(feedback.insertedId)});
    }

    async verifyCookie(cookie:string) {
        if (!secret) {
            throw new Error("No secret in .env.example!");
        }

        try {
            verify(cookie, secret);
            const token:Account = decode(cookie) as any;

            if (!isValidObjectId(token._id!)) {
                return undefined;
            }

            const col = await getCollection();
            return await col.findOne({_id: new ObjectId(token._id!)});
        } catch (e) {
            return undefined;
        }
    }
}

const isValidObjectId = (id:string) =>  {
    return ObjectId.isValid(id) && (String) (new ObjectId(id)) === id;
}

const getCollection = async () => {
    const client:MongoClient = await clientPromise;
    return client.db(process.env.DB_NAME).collection(collectionName);
}