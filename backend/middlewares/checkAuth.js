import jwt from 'jsonwebtoken' ;
import User from '../models/user.model.js';

const CheckAuth = async (req,res,next) => {
    try {
        console.log("i am in middleware") ; 

    
    
    const token= req.cookies.jwt ;
    if(!token) {
        return res.status(401).json({error : "Not authenticated"}) ;
    }
    let decoded = jwt.verify(token , process.env.SECRET) ;
    if(!decoded) {
        return res.status(401).json({error : "Not authenticated"}) ;
    }
    const id = decoded.id ; 
    const user = await User.findById(id) ;
    if(!user) {
        return res.status(401).json({error : "No user found"}) ;
    }
    req.user = user ;
    next() ; 

    } catch (error) {
        console.error(error) ;
        res.status(500).json({error : "Server Error"}) ;
    }
 }  ;  // end of CheckAuth function  ;  // end of export default CheckAuth ;  // end of module.exports = CheckAuth ;  // end of line 1  ;  // end of line 2  ;  // end of line 3  ;  // end of line 4  ;  // end of line 5  ;  // end of line 6  ;  // end of line 7  ;  // end of line 8  ;  // end of line 9  ;  // end of line 10  ;  // end of line 11  ;  // end of line 12  ;  // end of line 13  ;  // end of line 14  ;



export default CheckAuth ;