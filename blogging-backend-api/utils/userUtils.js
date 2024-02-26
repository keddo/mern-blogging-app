import {nanoid} from 'nanoid';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const generateUniqueName = async (email) => {
    let username = email.split('@')[0];
    let isNotUniqueName = await User.exists({"personal_info.username": username}).then(result => result)
    isNotUniqueName ? username += nanoid().substring(0, 5) : ""

    return username;
}

export const formatDataToSend = (user) => {
    const access_token = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_image: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname
    }
}

