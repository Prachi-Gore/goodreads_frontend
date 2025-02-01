// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Search from 'antd/es/input/Search';
import BookCard from "Components/BookCard/BookCard";
import Layout from "Layouts/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from 'react-slick';
import { getAllBooks } from "Redux/Slices/BookSlice";

import { sliderSettings } from './sliderSettings';

export default function Dashboard() {

    const bookState = useSelector((state) => state.book);
    const loading=useSelector(state=>{
        return state.book.loading ;});
    const dispatch = useDispatch();
    async function loadBooks() {
        
        if(bookState.bookList.length == 0) {
            await dispatch(getAllBooks());
        }
    }
function handleBookSearch(e){
    dispatch(getAllBooks(e));
}
    useEffect(() => {
        loadBooks();
    }, []);
  // slick slider setting
  const settings = sliderSettings(bookState.bookList);
    return (
        <Layout>
             <div className="h-full px-12 pt-28 pb-12">
                <div className='pb-5 flex justify-end pr-14'>
             <Search allowClear className='max-w-xs book-name-search' placeholder="Search By Book Name" loading={loading}  enterButton onSearch={handleBookSearch} /></div>
           {  bookState.bookList.length > 0 &&  <Slider {...settings} className="">
            { bookState.bookList.map(book => 
                
                <BookCard key={book.id} data={book}/>
             
            )}
            </Slider>}
            </div>
        </Layout>
    );
}