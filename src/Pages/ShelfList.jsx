import {EditOutlined,EyeOutlined }  from '@ant-design/icons';
import { Space, Table, Tag } from "antd";
// import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const ShelfList = ({shelfListData}) => {
    console.log('shelfListData ',shelfListData);
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
          // {
          //   title: 'Added At',
          //   dataIndex: 'createdAt',
          //   key: 'createdAt',
          //   render: (date) => {dayjs(date).format('D MMM YYYY h:mm a')}
          // },
          {
            title: 'Action',
            key: 'action',
            dataIndex: '',
            render:(book)=>{ return(<Space size='large'>
                <EditOutlined className='bg-yellow-100 p-2 rounded-lg text-base' onClick={()=>navigate(`/book/edit/${book?.id}`)} />
                <EyeOutlined className='bg-green-100 p-2 rounded-lg text-base' onClick={()=>navigate(`/book/show/${book?.id}`)} />
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
        // [
        //     {title:'a',genre:["abcd","abcd","abccd","abcd edddddd"]},
        //     {title:'ahghh',genre:["abcd","abcd","abccd","abcd edddddd"]}
        // ]
        shelfListData
        } />
    </div>
  );
};

export default ShelfList;
