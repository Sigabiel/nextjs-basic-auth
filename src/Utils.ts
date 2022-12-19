import * as crypto from "crypto";

const sha256Hasher = crypto.createHmac("sha256", process.env.TOKEN_SECRET!);

const hashSHA256 = (str:string) => {
    return sha256Hasher.update(str).digest("hex");
}

export default {
    hashSHA256
}