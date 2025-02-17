import {DeleteOutlined, EditOutlined,EyeOutlined }  from '@ant-design/icons';
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from 'react-redux';
// import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { updateBookDetails } from 'Redux/Slices/BookSlice';
import { getAllBookShelves } from 'Redux/Slices/ShelfSlice';

const ShelfList = ({shelfListData}) => {
   const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
       const parsToken=authState?.token;
       const accessToken=parsToken?.access;
    console.log('shelfListData ',shelfListData);
   async function onRemoveBook(bookId){ // onRemoveBook from shelf
         const response= await dispatch(updateBookDetails({data:{bookshelf:'None'},id:bookId,accessToken}));
         console.log("response ",response);
         if(response.payload.status===200){
          dispatch(getAllBookShelves());
         }
      
    }
    const navigate=useNavigate();
    const columns=[
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <h4>{text}</h4>,
          },
          {
            title: 'Genre',
            dataIndex: 'genres',
            key: 'genres',
            render: (genreList) =><Space wrap={true}>{ genreList?.map((genreItem)=><Tag key={genreItem?.id} color='geekblue'>{genreItem?.genre_name}</Tag>)}</Space>,
          },
          {
            title: 'Action',
            key: 'action',
            dataIndex: '',
            render:(book)=>{ return(<Space size='large'>
                <EditOutlined className='bg-yellow-100 p-2 rounded-lg text-base' onClick={()=>navigate(`/book/edit/${book?.id}`)} />
                <EyeOutlined className='bg-green-100 p-2 rounded-lg text-base' onClick={()=>navigate(`/book/show/${book?.id}`)} />
                <DeleteOutlined className='bg-red-100 p-2 rounded-lg text-base' onClick={()=>{
                  onRemoveBook(book?.id)}}/>  
            </Space>);}
          },
    ];
  return (
    <div>
     <Table 
      className='overflow-auto'
   pagination={false}
   sticky={true}
     scroll={{x:800 ,y:500}} columns={columns} dataSource={
        shelfListData
        } />
    </div>
  );
};

export default ShelfList;
