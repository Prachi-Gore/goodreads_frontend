import { Button, Form, Input, Tabs } from "antd";
import Layout from "Layouts/Layout";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShelf, getAllBookShelves } from 'Redux/Slices/ShelfSlice';

import ShelfList from "./ShelfList";

export default function Shelf() {
    const [form] = Form.useForm();
    const shelfState = useSelector((state) => state.shelf);
    const dispatch = useDispatch();
    const [books, setBooks] = useState([]);
    // const [shelfInput, setShelfInput] = useState("");
console.log("shelfState ",shelfState);
const onFinish = async (values) => {
    console.log('values ',values);
    await dispatch(createShelf(values));
    form.resetFields();
    await dispatch(getAllBookShelves());
  };
    async function loadShelfs() {
        if(shelfState.shelfList.length == 0) {
            const response = await dispatch(getAllBookShelves());
            if(response?.payload?.data?.length > 0) {
                setBooks(response?.payload?.data[0]?.books);
                // setActiveShelf(response?.payload?.data[0]?.id);
            } 
        } else if(shelfState.shelfList.length > 0) {
            setBooks(shelfState.shelfList[0].books);
            // setActiveShelf(shelfState.shelfList[0].id);
        }
    }

    // function changeActiveShelf(id) {
    //     setActiveShelf(id);
    //     shelfState.shelfList.forEach(shelf => {
    //         if(shelf.id == id) {
    //             setBooks(shelf.books);
    //         }
    //     });
    // }

    useEffect(() => {
        loadShelfs();
    }, []);

    return (
        <Layout>
            <div className='flex justify-start items-start pt-28'>
                {/* <div className='flex flex-col justify-start items-start pl-4'> */}
                    {/* {shelfState.shelfList.length > 0 && shelfState.shelfList.map((shelf) => {
                        return (
                            <div onClick={() => changeActiveShelf(shelf.id)} key={shelf.id} className='mt-3 mb-3  w-full'>
                                <button className={`btn-${activeShelf == shelf.id ? 'primary' : 'warning'} py-1 text-2xl rounded-md px-2 w-full`}>{shelf.name}</button>
                             </div>
                        );
                    })} */}
                    {/* <div>
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
                    </div> */}
                    {/* Updated UI shelf */}
                    <Form className="gap-x-4 flex justify-end w-full px-4" form={form} name="create-shelf" onFinish={onFinish}>
                        <Form.Item
                         name="shelfName"
                         rules={[{ required: true, message: 'Please enter shelf name!' }]}
                        > 
                      <Input placeholder="Enter shelf name" size="large"/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit"size="large"
                           >
                                Create New Shelf
                        </Button>
                    </Form>
            </div>
                        {/* Updated UI */}
                        <div className="p-28 bg-white">
                        <Tabs
        defaultActiveKey="1"
        tabPosition='top'
        style={{
          height: 220,
        }}
        onChange={(e)=>console.log('tab info ',e)}
        items={[
        //   { label: 'All',
        //         key: 0,
        //         children: <ShelfList shelfListData={books}/>},
            
            ...(shelfState?.shelfList?.map((shelf) => {
          return {
            label: `${shelf.name} ${shelf?.books?.length}`,
            key: shelf.id,
            children: <ShelfList shelfListData={shelf?.books}/>,
          };
        }))||[]]}
      />
    </div>
                     

        </Layout>
    );
}