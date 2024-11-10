import { BiUser } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function BookCard({ data }) {
    const navigate = useNavigate();
    const authState=useSelector(state=>state?.auth)
    return (
        <div className="book-card-container">
            <figure className='h-[300px] w-full'>
                <img src={`http://localhost:8000/api${data?.book_cover}`} alt="book cover" className='w-full h-full'/>
            </figure>
            <div className="my-2">
                <div className='flex justify-between'>
                <h2 className="text-white text-3xl">{data?.title}</h2>
                {/* <div className="flex justify-center mt-4"> */}
                        <button 
                        onClick={() => {
                            navigate(`/book/${data?.id}`);
                        }}
                        disabled={!authState?.isLoggedIn}
                        className={`px-2 py-1 rounded-lg ml-2  ${!authState?.isLoggedIn ? 'cursor-not-allowed bg-gray-300':'bg-blue-500'}`}>
                            More Details
                        </button>
                    {/* </div> */}
                    </div>
                <div className='flex justify-between items-center gap-4 mt-4'>
                    <div className='flex flex-col gap-3 text-white text-xl'>
                    <div className='flex justify-start gap-8 md:gap-5 items-center'>
                     
                            <BiUser className='text-yellow-300 text-3xl' />
                        
                        <div>
                            {data?.author?.author_name}
                        </div>
                    </div> 
                    <div>
                        {data.description}

                    </div>
                    </div>
                </div>
               
            </div>
        </div>
    );
}