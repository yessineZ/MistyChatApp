import express from 'express'; 
import axios from 'axios' ; 

export const generateAvatar = async (req,res) => {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/characters') ;
        const characters = response.data.data ; 
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
        res.json({ avatar: randomCharacter.images.jpg.image_url });

    }catch(err) {
        console.log(err) ; 
        res.status(500).json({"error" : "cannot get the avater "}) ; 

    }

    
}
