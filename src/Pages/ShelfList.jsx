import {EditOutlined,EyeOutlined }  from '@ant-design/icons';
import { Space, Table, Tag } from "antd";
import dayjs from 'dayjs';
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
            dataIndex: 'genre',
            key: 'genre',
            render: (genreList) =><Space wrap={true}>{ genreList?.map((genreItem,genreId)=><Tag key={genreId} color='geekblue'>{genreItem}</Tag>)}</Space>,
          },
          {
            title: 'Added At',
            dataIndex: 'added_at',
            key: 'addedat',
            render: (date) => {dayjs(date).format('D MMM YYYY h:mm a')}
          },
          {
            title: 'Action',
            key: 'action',
            dataIndex: '',
            render:()=>{ return(<Space size='large'>
                <EditOutlined className='bg-yellow-100 p-2 rounded-lg text-base' onClick={(id)=>navigate(`/book/edit/${id}`)} />
                <EyeOutlined className='bg-green-100 p-2 rounded-lg text-base' onClick={(id)=>navigate(`/book/show/${id}`)} />
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
        [
            {title:'a',genre:["abcd","abcd","abccd","abcd edddddd"]},
            {title:'ahghh',genre:["abcd","abcd","abccd","abcd edddddd"]}
        ]
        } />
    </div>
  );
};

export default ShelfList;
