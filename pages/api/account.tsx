import Handler from "../../src/Handler";
import {NextApiRequest, NextApiResponse} from "next";
import {sign} from "jsonwebtoken";
import {serialize} from "cookie";

const accHandler = Handler.accHandler;
export default async function (req:NextApiRequest, res:NextApiResponse) {
    const { order } = req.body;
    if (!order) return res.status(400).json({ success: false, response: "No order provided" });

    if (order == "authentication") {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, response: "No username or password provided" });

        const response = await accHandler.verifyCredentials(username, password);
        if (!response) {
            return res.status(401).json({ success: false, response: "Invalid credentials" });
        }

        const cookieToken = sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
            username: response.username,
            role: response.role,
            _id: response._id
        }, process.env.TOKEN_SECRET!);

        const cookie = serialize("authorization", cookieToken, {
            httpOnly: true,
            secure: process.env.STATE !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });

        res.setHeader("Set-Cookie", cookie);
        return res.status(200).json({ success: true });
    } else if (order == "logout") {
        const jwt = req.cookies.authorization;
        if (!jwt) return res.status(401).json({success: false, response: "No authorization token provided"});

        const serialized = serialize("authorization", "", {
            httpOnly: true,
            secure: process.env.STATE !== "development",
            sameSite: "strict",
            maxAge: 0,
            path: "/"
        });

        res.setHeader("Set-Cookie", serialized);
        return res.status(200).json({success: true});
    } else if (order == "register") {
        if (process.env.STATE != "development") return res.status(401).json({success: false, response: "Registration is disabled"});

        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, response: "No username or password provided" });
        const result = await accHandler.createAccount(username, password);
        return res.json({success: result != undefined, response: result ? result : "Account creation failed"});
    }
}