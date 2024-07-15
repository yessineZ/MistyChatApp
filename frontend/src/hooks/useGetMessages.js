import { useEffect, useState } from "react"
import useConversation from "../../zustand/useConversation";
import axios from "axios";
import { toast } from "react-hot-toast";

const useGetMessages= () => {
    const [loading,setLoading] = useState(false) ; 
    const {messages,setMessages,selectedConversation} = useConversation() ; 

    
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true) ;
            try {
                const res = await axios.get(`/api/messages/${selectedConversation._id}`) ;
                console.log(res.data)
                setMessages(res.data.conversation) ;
                console.log(messages) ; 
            } catch (error) {
                toast.error(error.message) ;
                console.error(error) ;
            }
            setLoading(false) ;
        }
        if(selectedConversation?._id) getMessages() ;
    },[selectedConversation._id,setMessages]);
    return {loading,messages} ;
}

export default useGetMessages ;