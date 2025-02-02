import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Form, Input, Modal, Select, Space, Tag, Typography } from 'antd';
import { Image } from 'antd';
import dayjs from 'dayjs';
import Layout from "Layouts/Layout";
import { useEffect, useState } from 'react';
// import { BiUser } from 'react-icons/bi';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getBookDetails } from 'Redux/Slices/BookSlice';
import { addBookToShelf, getAllBookShelves } from 'Redux/Slices/ShelfSlice';

export default function BookDescription() {
    const [editId,setEditId]=useState();
    const [reviewForm]=Form.useForm();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
      };
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setEditId(null)
        setOpen(false);
      };
      function handleOk(values){
// make add / update api call then close modal on success
// if edit id then make update call and on success setEditId(null)
// else call add call
console.log("handle ok values ",values)
      }
    const reviews=[{
        username:'prachi',
        created_at:'12 june 2023',
        updated_at:'15 june 2023',
        description:'njffffffffffffffffff hfffffffffff jfffffffffffff ffffffffffffff jffffffffffff f fffff ff',
        id:1
    },
    {
        username:'prachi',
        created_at:'12 june 2023',
        updated_at:'',
        description:'njffffffffffffffffff hfffffffffff jfffffffffffff ffffffffffffff jffffffffffff f fffff ff',
        id:2
    },
    {
        username:'prachi',
        created_at:'12 june 2023',
        updated_at:'15 june 2023',
        description:'njffffffffffffffffff hfffffffffff jfffffffffffff ffffffffffffff jffffffffffff f fffff ff',
        id:3
    }
];
    const [rows, ] = useState(2);
  const [expanded, setExpanded] = useState(false);
    let disabled=false;
   const {id}=useParams();
   const location = useLocation();
  const { pathname } = location;
    const dispatch = useDispatch();
    const shelfState = useSelector((state) => state.shelf);
    const bookDetails=useSelector(state=>state.book.bookDetails);
    console.log('shelfState ',shelfState);
    console.log('bookDetails ',bookDetails);

    const { Title, Text } = Typography;
   function onChangeShelf(e){
    console.log("onChangeShelf ",e)
    dispatch(addBookToShelf({shelfName: e, bookId: bookDetails?.id}));
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
        <div className='  bg-blue-100 h-full flex flex-row justify-center items-center book-description'>
            <div className=' bg-[#AEA371] h-[81%] mt-[70px] rounded-xl flex justify-between items-center p-10  w-[80%] max-w-[80%] gap-x-4 min-w-[300px]'>
                <div className='flex w-[40%] flex-col items-center' >
<Image
    src={`http://127.0.0.1:8000/${bookDetails?.book_cover}`}
    preview={false}
    className='max-w-[300px] '
  />
<Title level={4} className='flex-wrap mt-2'>
{bookDetails?.title}
</Title>
<Title level={5} className='!mt-0'>
    {bookDetails?.author?.author_name}
</Title>
<Text className='text-base text-black'>
Avg Rating: {4.5}
</Text>
  <ReactStars
    count={5}
    size={24}
    value={bookDetails?.rating}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
    edit={disabled}
  />

                               <Select
          // mode="multiple"
          size='large'
          disabled={disabled}
          placeholder="Where to keep book "
          defaultValue={[]} // user should now currently book is in which shelf
          onChange={onChangeShelf}
          options={shelfState?.shelfList?.map((shelfItem)=>({
            label:shelfItem.name,
            value:shelfItem.id
          }))||[]}
          className='w-60 max-w-[100%]'
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
<Space wrap={true}>
{
  bookDetails?.genres?.map((genreItem)=><Tag key={genreItem?.id} color="green">{genreItem?.genre_name}</Tag>)
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
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet commodi ex assumenda? Blanditiis aut architecto iure qui voluptas, expedita enim inventore quam sint quod sed dignissimos voluptate cumque praesentium labore quae ea saepe aperiam fugit excepturi et magnam! Corporis ipsa voluptate dolore sequi quis porro accusantium doloremque nobis voluptates minus placeat officia earum similique quasi repudiandae assumenda eaque facere asperiores modi, exercitationem veniam recusandae minima architecto. Blanditiis, ex maxime. Perspiciatis totam quasi quas modi veritatis minus qui, optio voluptates autem dolorem quia culpa assumenda asperiores illo exercitationem ea magnam corporis iste dolores voluptatem facilis molestiae ab, nulla dicta! Veniam voluptates neque dolor facere amet repellendus dolorem sunt mollitia, dignissimos eligendi hic suscipit est reiciendis ratione, excepturi reprehenderit molestias laudantium cum a. Repellat fugiat amet voluptatem consequuntur dolore itaque. Officiis deserunt debitis dolorum odio similique voluptas. Ullam iure impedit quam facilis unde laborum mollitia quasi esse. Minima possimus fugit non consequatur magnam vero tenetur nulla, aperiam nobis accusantium id aliquid aspernatur, optio architecto numquam aut in repudiandae perspiciatis iste veritatis labore. Autem dolorem veniam eligendi incidunt mollitia facere porro voluptate tenetur repudiandae et officia itaque iusto quis corporis illum magnam nesciunt tempora odit amet illo, modi a? Tempore culpa sit nisi corrupti sint dicta voluptatibus quaerat accusantium accusamus ea molestias, totam, animi atque! Totam labore magnam praesentium numquam cum iure corrupti sequi consequuntur earum in expedita harum possimus commodi cupiditate reprehenderit culpa, nobis impedit veritatis, perferendis odio asperiores! Laborum commodi voluptatibus dolor excepturi corporis repudiandae eligendi impedit, facere at sunt corrupti aliquid, nobis quasi nesciunt! Voluptatem doloribus sit deserunt cumque tempore. Ex labore vero ratione! Nostrum dicta ullam quas perspiciatis accusantium quam quis quaerat aspernatur minima omnis. Consectetur repellat nostrum voluptates harum praesentium exercitationem culpa, omnis a iste ratione? Animi repellendus corrupti voluptatibus quaerat autem in eum velit alias sunt vero quo suscipit ad sapiente, reiciendis ipsum voluptas mollitia quae hic laboriosam dolores cum temporibus reprehenderit eveniet non? Voluptatibus consequatur vero totam ipsam cum et est quidem, tempore ab magnam aperiam nostrum nihil voluptatem laboriosam aut sapiente reprehenderit repellat illum at necessitatibus assumenda quos. Sint aliquam exercitationem et laudantium ea, non officia cum vero at excepturi alias? Fugiat, maiores placeat praesentium sed perferendis modi! Cum rerum unde labore voluptatibus provident reiciendis magni explicabo perferendis distinctio soluta neque architecto deserunt velit non eveniet voluptas aliquam qui sed, voluptate illum libero iste nihil. Officia nihil minus iste tempore quia aliquid consectetur assumenda voluptatibus commodi, et id. Culpa non aliquam dolor id rem recusandae corporis dolorum nesciunt veniam optio at saepe esse sapiente voluptatem labore, nulla eaque sequi molestias. Consectetur commodi, sunt aliquam placeat itaque id eius repellendus natus modi assumenda. Quia aperiam laudantium, beatae eum est odio cupiditate perspiciatis mollitia velit et iure pariatur amet, ad officiis. Architecto, sapiente. Sed, corrupti voluptates. Earum consequuntur dolor provident doloribus, est, delectus amet, autem sunt tempore soluta aliquam ut? Itaque consequatur inventore rerum tenetur natus vel laborum facilis debitis, a perspiciatis fugiat porro alias ex libero similique sequi quia animi, molestias, adipisci et harum omnis aspernatur.
      </Typography.Paragraph>
      </div>
      <div className='h-1/2'>
      <Flex justify='space-between'align='top'>
        <Title level={4}>
        Reviews
        </Title>
        <Button  type="primary"className="bg-blue-600"onClick={showModal}>
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
                 <Title className=' !mb-0 text-red-950' level={5}>{review?.username}</Title>
                 <Text className=''>{review?.updated_at?'updated':'added'} {`about `} 
                 
                    {review.updated_at} hrs ago</Text></Space>
                 <Text>{review?.description}</Text>
            </Flex>
            <Space size='large' >
                <Button icon={<EditOutlined className='text-blue-500 !border-none'/>} disabled={disabled} onClick={()=>{setEditId(review?.id);
                    setOpen(true)
                }}/>
                <Button icon={<DeleteOutlined className='text-red-600' />} disabled={disabled} onClick={()=>console.log("called review del api")}/>

            </Space>
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