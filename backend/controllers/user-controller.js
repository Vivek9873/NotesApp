import User from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).populate("notes");
        if (!user) {
            return res.status(404).json({ message: "Unauthorized User!" })
        }
        return res.status(200).json({ message: "User found Successfully", data: user });
    }
    catch (e) {
        res.status(500).json({ message: "Get User error is " + e.message })
    }
}