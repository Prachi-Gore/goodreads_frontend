import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function BookCard({ data }) {
    const navigate = useNavigate();
    const authState=useSelector(state=>state?.auth);
    console.log("data book card ",data)
    return (
        <div className="book-card-container">
            <figure className='h-[200px] w-full'>
                <img src={data?.book_cover} alt={data?.title} className='w-full h-full'/>
            </figure>
            {/* <div className="my-2 "> */}
                <div className='flex justify-between w-full my-2'>
                <h2 className=" text-xl text-black font-semibold">{data?.title}</h2>
                {/* <div className="flex justify-center mt-4"> */}
                        <button 
                        onClick={() => {
                            navigate(`/book/edit/${data?.id}`);
                        }}
                        disabled={!authState?.isLoggedIn}
                        className={`px-2 py-1 rounded-lg ml-2 text-white  ${!authState?.isLoggedIn ? 'cursor-not-allowed bg-gray-500':'bg-red-900'}`}>
                            More Details
                        </button>
                    {/* </div> */}
                    </div>
                {/* <div className='flex justify-between items-center gap-4 mt-4 text-white text-xl '> */}
                    {/* <div className='flex flex-col gap-3 '> */}
                    {/* <div className='flex justify-start gap-8 md:gap-5 items-center'>
                     
                            <BiUser className='text-yellow-300 text-3xl' />
                        
                        <div>
                            {data?.author?.author_name}
                        </div>
                    </div>  */}
                {/* </div> */}
               
            {/* </div> */}
        </div>
    );
}