import { Select, Typography } from 'antd';
import dayjs from 'dayjs';
import Layout from "Layouts/Layout";
import { useEffect } from 'react';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getBookDetails } from 'Redux/Slices/BookSlice';
import { addBookToShelf, getAllBookShelves } from 'Redux/Slices/ShelfSlice';

export default function BookDescription() {
    let disabled=false;
   const {id}=useParams();
   const location = useLocation();
  const { pathname } = location;
    const dispatch = useDispatch();
    const shelfState = useSelector((state) => state.shelf);
    const bookDetails={id:1,book_cover:'data:image/jpeg;base64,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',title:'dd',description:'dddddddd ddddd',author:{author_name:'d dd ffffffff'},genre:[{id:1,genre_name:'comics'}],pages:450,publishDate:'2012-01-04 UTC--2012-03-27 UTC'};

    console.log('bookDetails ',bookDetails);
    const { Title, Text } = Typography;
    useEffect( () => {
        if(id) dispatch(getBookDetails(id));
        dispatch(getAllBookShelves());
    }, [id,dispatch]);
    if(pathname?.includes('/show/')){
       disabled=true;
    }
    return (
        <Layout>
            {
                bookDetails?.id && (
        //             <div className="flex items-center justify-center gap-5 flex-col md:flex-row pt-28 bg-blue-50 h-[calc(100vh-140px)]">
        //                 <div className="basis-1/4 h-1/5 flex justify-center">
        //                     <img className="w-3/4 h-full" src={`${bookDetails?.book_cover}`}/>
        //                 </div>
        //                 <div className='flex flex-col items-center justify-center gap-10'>
        //                     <div className='text-black text-4xl'>
        //                         {bookDetails?.title}
        //                     </div>
        //                     <div className='text-black text-xl w-3/4'>
        //                         {bookDetails?.description}
        //                     </div>
        //                     <div className=' flex justify-start gap-5 items-center text-2xl text-yellow-400'>
        //                         <div>
        //                             <BiUser />
        //                         </div>
        //                         <div>
        //                             {bookDetails?.author?.author_name}
        //                         </div>
        //                     </div> 
        //                     <div className='flex justify-start items-start flex-wrap gap-3'>
        //                         {bookDetails?.genres?.map((genre) => {
        //                             return <div key={genre?.id} className="bg-green-400 text-xl px-2 py-1 rounded-md">{genre.genre_name}</div>; 
        //                         })}
        //                     </div>
        //                     <div className='text-xl'>
        //                         Pages: <span className='text-yellow-400'>{bookDetails?.pages}</span>
        //                     </div>
        //                     <div className='text-xl'>
        //                         Publish Date: <span className='text-yellow-400'>{dayjs(bookDetails?.publishDate).format("DD MMM YYYY")}</span>
        //                     </div>
        //                     {/* <div>
        //                     <details className="dropdown mb-32" id='shelf-dropdown'>
        //                         <summary className="m-1 btn">Add to Shelf</summary>
        //                         <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
        //                             {shelfState.shelfList.length > 0 && shelfState.shelfList.map((shelf) => {
        //                                 return <li onClick={async () => {
        //                                    const response= await dispatch(addBookToShelf({shelfName: shelf.name, bookId: bookDetails?.id}));
        //                                   const element=  document.getElementById('shelf-dropdown');
        //                                   if (response?.payload?.status===200 && element.hasAttribute("open")) {
        //                                     element.removeAttribute("open"); // Removes the 'open' attribute
        //                                 }
        //                                     // await dispatch(getAllBookShelves());
        //                                 }} className='text-black' key={shelf.id}><a>{shelf.name}</a></li>;
        //                             })}
        //                         </ul>
        //                         </details>
        //                     </div> */}
        //                             <Select
        //   mode="multiple"
        //   size='large'
        //   disabled={disabled}
        //   placeholder="Where to keep book "
        //   defaultValue={[]} // user should now currently book is in which shelf
        //   onChange={()=>{}}
        //   style={{ width: '100%' }}
        //   options={shelfState?.shelfList?.map((shelfItem)=>({
        //     label:shelfItem.name,
        //     value:shelfItem.id
        //   }))}
        // />

        //                 </div>  
        //             </div>
        <div className='flex justify-between bg-blue-50 h-[calc(100vh-140px)]'>
            <div>
<div>
    img antd
</div>
<Title level={4}>
{bookDetails?.title}
</Title>
<Text>
    {bookDetails?.author?.author_name}
</Text>
            </div>
            <div>

            </div>

        </div>
                )
            }
        </Layout>
    );
}