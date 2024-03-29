import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import { formatDataToSend, generateUniqueName } from '../utils/userUtils.js';
export const signup = async (req, res) => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
    let {fullname, email, password } = req.body;

    if(fullname.length < 3){
        return res.status(403).json({error: "Fullname must be at least 3 letters long."})
    }
    if (!email.length) {
        return res.status(403).json({error: "Enter Email"})
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({error: "Email is invalid."})
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({error: "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase."})
    }
    
    bcryptjs.hash(password, 10, async (err, hashed_password) => {
        let username = await generateUniqueName(email);
        let newUser = await new User({
           personal_info: {fullname, email, password: hashed_password, username}
        });
        newUser.save().then(u => {
            return res.status(200).json({user: formatDataToSend(newUser)})
        }).catch(err => {
            if(err.code === 11000) return res.status(500).json({error: 'User already exits.'})
            return res.status(500).json({error: err.message})
        })
    })
}

export const signin = (req, res) => {
    const {email, password} = req.body;

    User.findOne({'personal_info.email': email}).then(user => {
       if(!user){
        return res.status(403).json({"error": "Email not found!"})
       }
       bcryptjs.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res.status(403).json({"error": "Error occured while login please try again. If error persists contact support."});
        }
        if(!result){
            return res.status(403).json({"error": "Incorrect password"})
        }
        else
        {
            return res.status(200).json({user: formatDataToSend(user)})
        }
       })
    }).catch(err => {
       return res.status(500).json({"error": err.message})
    });
}