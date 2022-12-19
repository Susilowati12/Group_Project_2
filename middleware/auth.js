const jwt = require("jsonwebtoken");
const KEY = "asdfjsdaklf234234";
const User = require("../models/user");
verifyToken = (req, res, next) => {
    const token=req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded;

        next();
    });
};
isNakes = (req, res, next) => {
    if (req.userId.role == "nakes") {
        next();
        return;
    }
    else {
        res.status(500).send({ message: "Unable to access" });
        return;
    }
};

isDokter = (req, res, next) => {
    if (req.userId.role == "dokter") {
        next();
        return;
    }
    else {
        res.status(500).send({ message: "Unable to access" });
        return;
    }
}


const auth = {
    verifyToken,
    isNakes,
    isDokter
};
module.exports = auth;
