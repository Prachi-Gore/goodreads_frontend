import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Form, Input, Modal, Select, Space, Tag, Typography } from 'antd';
import { Image } from 'antd';
import dayjs from 'dayjs';
import Layout from "Layouts/Layout";
import { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { createReview,deleteReview, getBookDetails, updateBookDetails,updateReview } from 'Redux/Slices/BookSlice';
import {  getAllBookShelves } from 'Redux/Slices/ShelfSlice';


export default function BookDescription() {
    const { Title, Text } = Typography;
    const [editId,setEditId]=useState();
    const [reviewForm]=Form.useForm();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
      };
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setEditId(null);
        setOpen(false);
        reviewForm.resetFields();
      };
 
    const [rows, ] = useState(2);
  const [expanded, setExpanded] = useState(false);
    let disabled=false;
   const {id}=useParams();
   const location = useLocation();
  const { pathname } = location;
    const dispatch = useDispatch();
    const shelfState = useSelector((state) => state.shelf);
    const bookDetails=useSelector(state=>state.book.bookDetails);
    const authState = useSelector((state) => state.auth);
    const userId=authState?.userId;
    const reviews=useSelector((state) => state.book.reviews);
    const parsToken=authState?.token;
    const accessToken=parsToken?.access;
  
    async function ondeleteReview(reviewId) {
     const response= await dispatch(deleteReview({id:reviewId,accessToken}));
     console.log("response on delete ",response);
    }
    async function handleOk(values){
      // make add / update api call then close modal on success
      // if edit id then make update call and on success setEditId(null)
      // else call add call
      console.log("handle ok values ",values);
      if(editId){
        const response=await dispatch(updateReview({data:{...values,book:id},id:editId,accessToken}));
        console.log("response api success",response)

        if(response?.payload?.status===200){
          reviewForm.resetFields();
          setOpen(false);
          setEditId(null)
        }
      }else{
        console.log("id ",id)
      const response=await dispatch(createReview({data:{...values,book:id},accessToken}));
      console.log("response api success",response)
      if(response?.payload?.status===201){
        reviewForm.resetFields();
        setOpen(false);
      }
      }
      return;
      
            }
    function onRatingChange(e){
      console.log("onRatingChange ",e);
      dispatch(updateBookDetails({data:{rating:e},id:id,accessToken}));
    }
   function onChangeShelf(e){
    console.log("onChangeShelf ",e);
    dispatch(updateBookDetails({data:{bookshelf:e},id:id,accessToken}));
   }
   function getFormattedDate(date){
    return dayjs(date)?.format("DD MMM YYYY hh:mm A");
   }
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
        <div className='  bg-blue-100 flex flex-row justify-center items-center book-description w-full'>
            <div className=' bg-[#AEA371]  rounded-xl flex justify-between items-center p-10  w-[80%] max-w-[80%] gap-x-4 min-w-[300px]'>
                <div className='flex w-[40%] flex-col items-center' >
<Image
    src={`${bookDetails?.book_cover}`}
    preview={false}
    className='max-w-[300px]'
  />
<Title level={4} className='flex-wrap mt-2'>
{bookDetails?.title}
</Title>
<Title level={5} className='!my-0'>
    {bookDetails?.author?.author_name}
</Title>
{/* <Text className='text-base text-black '>
Avg Rating: {4.5}
</Text> */}
  <ReactStars
    count={5}
    size={24}
    value={bookDetails?.rating}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
    edit={!disabled}
    onChange={onRatingChange}
  />

                               <Select
          size='large'
          disabled={disabled}
          placeholder="Where to keep book "
          onChange={onChangeShelf}
          options={shelfState?.shelfList?.map((shelfItem)=>({
            label:shelfItem.name,
            value:shelfItem.id
          }))||[]}
          value={bookDetails?.bookshelf}
          className='w-60 max-w-[100%] mt-1'
        />
        </div>
        <div className='flex-1 h-full'>
            <Title level={4}>
About Book
            </Title>
            <div className='overflow-y-auto h-1/2 flex flex-col'>

            <Flex justify='space-between'  >
              <Space direction='vertical' >
            <Text className='text-lg italic '>
   Publish Date: <span className='text-base'>{dayjs(bookDetails?.publishDate).format("DD MMM YYYY")}</span>
</Text>
<Text className='italic !mb-0'>
    {bookDetails?.pages} pages
</Text>
</Space>
<Space wrap>
{
  bookDetails?.genres?.map((genreItem)=><Tag key={genreItem?.id} color="green" className='text-lg'>{genreItem?.genre_name}</Tag>)
}
</Space>
</Flex>
<Divider className=' !border-black' orientation="center" >Description</Divider>
<Typography.Paragraph
        ellipsis={{
          rows,
          expandable: 'collapsible',
          expanded,
          onExpand: (_, info) => setExpanded(info.expanded),
        }}
        className='text-base'
      >
        {bookDetails?.description}
      </Typography.Paragraph>
      </div>
      <div className='h-1/2'>
      <Flex justify='space-between'align='top'>
        <Title level={4}>
        Reviews
        </Title>
        <Button  type="primary"className="bg-blue-600"onClick={showModal} disabled={disabled}>
             Add Review
            </Button>
            </Flex>
        <Modal
        // title="Title"
        open={open}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        // okText='Add Review'
        maskClosable={false}
        // okButtonProps={{defaultBg:'#0958d9'}}
        footer={
           <></>
        }
      >
        <Form
                 name="review"
                 form={reviewForm}
                 onFinish={handleOk}
                 layout="vertical"
                  className="mt-8"
                  autoComplete="off"
                  // initialValues={{review:editReview}}
                >
                    <Form.Item
            name="review"
            rules={[
              {
                required: true,
                message: "Review is required!",
              }
            ]}
          >
             <Input placeholder='Review'
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }} className='flex justify-end' >
            <Button  type="primary" htmlType="submit"className="bg-blue-600" >
             {`${editId?'Update':'Add'}`} Review
            </Button>
          </Form.Item>
                </Form>
                </Modal>
<div className='h-4/5 overflow-y-auto'>
{
    reviews?.map(review=>(
        <>
         <Divider className='my-1' />
      
        <Flex key={review.id} justify='space-between' className=' pl-1 pr-4' gap={10}>
           
            <Flex vertical>
                <Space className='' align='center' >
                 <Title className=' !mb-0 text-red-950' level={5}>{review?.user?.username}</Title>
                 <Text className=''>{review?.updated_at?'Updated':'Created'} {`at `} 
                 {review?.updated_at?getFormattedDate(review?.updated_at):getFormattedDate(review?.created_at)}
            </Text></Space>
                 <Text>{review?.review}</Text>
            </Flex>
          {userId===review?.user?.id && <Space size='large' >
               <Button className='border-none' icon={<EditOutlined className='text-blue-900 !border-none'/>} disabled={disabled} onClick={()=>{setEditId(review?.id);
                // setEditReview(review.review);
                reviewForm.setFieldValue('review',review.review);
                    setOpen(true);
                }}/>
                <Button className='border-none ' icon={<DeleteOutlined className='text-red-600 ' />} disabled={disabled} onClick={()=>ondeleteReview(review?.id)}/>

            </Space>}
        </Flex>
        </>
    ))
}
</div>
      </div>
        </div>
        </div>
        </div>)}
        </Layout>
    );
}