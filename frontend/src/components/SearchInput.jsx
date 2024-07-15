import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import { toast } from "react-hot-toast";

const SearchInput = () => {
	const [search,setSearch] = useState("");
	const {setSelectedConversation} = useConversation() ;
	const {conversations} = useGetConversations() ;

	const handleSubmit = (e) => {
		e.preventDefault() ; 
		if(search === "")  {
			toast.error("please select a search")  ;
			return;  // prevent form submission if search term is empty  ;   // if you want to show a different error message, you can add a conditional statement here instead of using toast.error  ;  // in this case, it's just preventing form submission  ;  ;  // you can also use a different error message library like sweetalert or toast.js to show a custom error message  ;  ;  // if you want to use toast.error, you can
		}
		if(search.length <=3) {
			toast.error("search term must be at least 4 characters long")  ;
            return;  ;  // prevent form submission if search term is less than 4 characters long  ;   // if you want to show a different error message, you can add a conditional statement here instead of using toast.error  ;  // in this case, it's just preventing form submission  ;  ;  // you can also use a different error message library like sweetalert or toast.js to show a custom error message  ;  ;  // if you want to use toast.error, you can remove the conditional statement and just use toast.error  ;  ;  // if you want to use a different error message library, you can remove the conditional statement and just use the library's error message function to show the error message  ;  ;  // if you want to use a different error message library, you can remove the conditional statement and just use the
		}
		console.log(conversations) ; 
        const foundConversation = conversations.map((ele) => {
			if (ele.fullName.includes(search)) return ele; // if the search term is found in the participants array, set the selected conversation to that conversation  ;  ;  // if you want to set the selected conversation to the first conversation that matches the search term, you can remove the return statement and just set the selected conversation to ele  ;  ;  // if you want to set the selected conversation to the first conversation that matches the search term, you can remove the return
		});
        if (foundConversation) setSelectedConversation(foundConversation[0]);
		console.log(foundConversation);
        setSearch("");
	}
	
	
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input value={search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search…' className='input input-bordered rounded-full' />
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;