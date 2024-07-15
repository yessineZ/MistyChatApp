import User from "../models/user.model.js";
export const getUsersForSideBar = async (req,res) => {
    try {
        let id = req.user._id ; 
        let users = await User.find({_id: {$ne: id}}).select("-password");
        res.status(200).json(users);
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    } 
}