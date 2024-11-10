import Layout from "Layouts/Layout";
import { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createShelf, getAllBookShelves } from 'Redux/Slices/ShelfSlice';

export default function Shelf() {

    const shelfState = useSelector((state) => state.shelf);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeShelf, setActiveShelf] = useState(null);
    const [books, setBooks] = useState([]);
    const [shelfInput, setShelfInput] = useState("");
console.log("shelfState ",shelfState)
    async function loadShelfs() {
        if(shelfState.shelfList.length == 0) {
            const response = await dispatch(getAllBookShelves());
            if(response?.payload?.data?.length > 0) {
                setBooks(response?.payload?.data[0]?.books);
                setActiveShelf(response?.payload?.data[0]?.id);
            } 
        } else if(shelfState.shelfList.length > 0) {
            setBooks(shelfState.shelfList[0].books);
            setActiveShelf(shelfState.shelfList[0].id);
        }
    }

    function changeActiveShelf(id) {
        setActiveShelf(id);
        shelfState.shelfList.forEach(shelf => {
            if(shelf.id == id) {
                setBooks(shelf.books);
            }
        });
    }

    useEffect(() => {
        loadShelfs();
    }, []);

    return (
        <Layout>
            <div className='flex justify-start items-start gap-32 pt-28'>
                <div className='flex flex-col justify-start items-start pl-4'>
                    {shelfState.shelfList.length > 0 && shelfState.shelfList.map((shelf) => {
                        return (
                            <div onClick={() => changeActiveShelf(shelf.id)} key={shelf.id} className='mt-3 mb-3  w-full'>
                                <button className={`btn-${activeShelf == shelf.id ? 'primary' : 'warning'} py-1 text-2xl rounded-md px-2 w-full`}>{shelf.name}</button>
                             </div>
                        );
                    })}
                    <div>
                        <input 
                            className='p-4 bg-white rounded-sm mb-4 text-black border-2 border-blue-500' 
                            placeholder='Enter shelf name' 
                            onChange={(e) => {
                                setShelfInput(e.target.value);
                            }}
                            value={shelfInput}
                        />
                        <button 
                            onClick={async () => {
                                await dispatch(createShelf({shelfName: shelfInput}));
                                await dispatch(getAllBookShelves());
                                setShelfInput('');

                            }}
                            className='block btn-accent px-4 py-2 rounded-md'>
                                Create New Shelf
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                {books.length > 0 && (
                    <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        
                        <th>Title</th>
                        <th>Rating</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {books.length > 0 && books.map(book => {
                        return (
                            <tr className='hover:bg-slate-100' key={book.id} >
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={`http://localhost:8000/api${book?.book_cover}`} alt="Book Image" />
                                        </div>
                                        </div>
                                        <div>
                                        <div className="font-bold text-xl" >{book.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                <ReactStars
    count={5}
    size={24}
    value={book?.rating}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
    edit={false}
  /></td>
                                <th>
                                <button className="btn btn-ghost btn-xs text-l"onClick={() => {
                                navigate(`/book/${book.id}`);
                            }}>details</button>
                                </th>
                        </tr>
                        );
                    })}
                    
                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                    <tr>
                        <th>Title</th>
                        <th>Rating</th>
                        <th></th>
                    </tr>
                    </tfoot> */}
                    
                </table>
                )}
                
            </div>
            </div>
           `
        </Layout>
    );
}