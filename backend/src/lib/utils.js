import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

export const generateToken = (userId,res) => {
    const token = jwt.sign({ id: userId}, ENV.JWT_SECRET, {
        expiresIn: '7d',
    });
 
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 *60 * 1000, //7 days
        httpOnly: true, //prevent xss attackers: cross-site scripting
        sameSite: "Strict", //CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true, //https ,
    });

    return token;
}