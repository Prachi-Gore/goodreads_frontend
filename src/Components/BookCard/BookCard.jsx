import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
export default function BookCard({ data }) {
    const navigate = useNavigate();
    return (
        <div className="mt-5 mb-5 card md:card-side bg-gray-800 md:h-60 w-full shadow-md">
            <figure className='h-full w-1/4'>
                <img src={`http://localhost:8000/api${data?.book_cover}`} alt="book cover" className='h-1/5 md:h-full w-full'/>
            </figure>
            <div className="card-body">
                <h2 className="card-title text-white text-4xl">{data?.title}</h2>
                <div className='mt-12 flex justify-between items-center gap-4'>
                    <div className='flex flex-col gap-3 text-white text-xl'>
                    <div className='flex justify-start gap-8 md:gap-5 items-center'>
                        <div>
                            <BiUser />
                        </div>
                        <div>
                            {data?.author?.author_name}
                        </div>
                    </div> 
                    <div>
                        {data.description}

                    </div>
                    </div>
                    
                    <div className="card-actions justify-end">
                        <button 
                        onClick={() => {
                            navigate(`/book/${data?.id}`);
                        }}
                        className="btn btn-primary">
                            More Details
                        </button>
                    </div>
                </div>
               
            </div>
        </div>
    );
}