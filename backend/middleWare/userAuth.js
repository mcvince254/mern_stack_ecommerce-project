import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";
export const verifyUserAuth = handleAsyncError(async (req, res, next) => {

    let token;

    // Check Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Otherwise check cookie
    if (!token && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(
            new HandleError(
                "Authentication is missing!",
                401
            )
        );
    }

    const decodedData = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
    );

    req.user = await User.findById(decodedData.id);

    next();
});
