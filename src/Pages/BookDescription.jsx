import dayjs from 'dayjs';
import Layout from "Layouts/Layout";
import { useEffect } from 'react';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookDetails } from 'Redux/Slices/BookSlice';
import { addBookToShelf, getAllBookShelves } from 'Redux/Slices/ShelfSlice';

export default function BookDescription() {
   const {id}=useParams();
    const dispatch = useDispatch();
    const shelfState = useSelector((state) => state.shelf);
    const bookDetails=useSelector(state=>state.book.bookDetails);

    console.log('bookDetails ',bookDetails);

    useEffect( () => {
        if(id) dispatch(getBookDetails(id));
        dispatch(getAllBookShelves());
    }, [id,dispatch]);
    return (
        <Layout>
            {
                bookDetails?.id && (
                    <div className="my-5 flex items-center justify-center gap-5 flex-col md:flex-row pt-28">
                        <div className="basis-1/4 h-1/5 flex justify-center">
                            <img className="w-3/4 h-full" src={`http://localhost:8000/api${bookDetails?.book_cover}`}/>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-10'>
                            <div className='text-black text-4xl'>
                                {bookDetails?.title}
                            </div>
                            <div className='text-black text-xl w-3/4'>
                                {bookDetails?.description}
                            </div>
                            <div className=' flex justify-start gap-5 items-center text-2xl text-yellow-400'>
                                <div>
                                    <BiUser />
                                </div>
                                <div>
                                    {bookDetails?.author?.author_name}
                                </div>
                            </div> 
                            <div className='flex justify-start items-start flex-wrap gap-3'>
                                {bookDetails?.genres?.map((genre) => {
                                    return <div key={genre?.id} className="bg-green-400 text-xl px-2 py-1 rounded-md">{genre.genre_name}</div>; 
                                })}
                            </div>
                            <div className='text-xl'>
                                Pages: <span className='text-yellow-400'>{bookDetails?.pages}</span>
                            </div>
                            <div className='text-xl'>
                                Publish Date: <span className='text-yellow-400'>{dayjs(bookDetails?.publishDate).format("DD MMM YYYY")}</span>
                            </div>
                            <div>
                            <details className="dropdown mb-32" id='shelf-dropdown'>
                                <summary className="m-1 btn">Add to Shelf</summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
                                    {shelfState.shelfList.length > 0 && shelfState.shelfList.map((shelf) => {
                                        return <li onClick={async () => {
                                           const response= await dispatch(addBookToShelf({shelfName: shelf.name, bookId: bookDetails?.id}));
                                          const element=  document.getElementById('shelf-dropdown');
                                          if (response?.payload?.status===200 && element.hasAttribute("open")) {
                                            element.removeAttribute("open"); // Removes the 'open' attribute
                                        }
                                            // await dispatch(getAllBookShelves());
                                        }} className='text-black' key={shelf.id}><a>{shelf.name}</a></li>;
                                    })}
                                </ul>
                                </details>
                            </div>
                        </div>  
                    </div>
                )
            }
        </Layout>
    );
}