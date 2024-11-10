// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BookCard from "Components/BookCard/BookCard";
import Layout from "Layouts/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from 'react-slick';
import { getAllBooks } from "Redux/Slices/BookSlice";

import { sliderSettings } from './sliderSettings';

export default function Dashboard() {

    const bookState = useSelector((state) => state.book);
    const dispatch = useDispatch();
    console.log('bookState ',bookState);
    async function loadBooks() {
        
        if(bookState.bookList.length == 0) {
            await dispatch(getAllBooks());
        }
    }

    useEffect(() => {
        loadBooks();
    }, []);
  // slick slider setting
  const settings = sliderSettings(bookState.bookList);
    return (
        <Layout>
             <div className="px-12 py-6">
           {  bookState.bookList.length > 0 &&  <Slider {...settings} className="">
            { bookState.bookList.map(book => 
                
                <BookCard key={book.id} data={book}/>
             
            )}
            </Slider>}
            </div>
        </Layout>
    );
}