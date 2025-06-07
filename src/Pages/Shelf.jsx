import { Button, Form, Input, Tabs } from "antd";
import Layout from "Layouts/Layout";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShelf, getAllBookShelves } from 'Redux/Slices/ShelfSlice';

import ShelfList from "./ShelfList";

export default function Shelf() {
    const [form] = Form.useForm();
    const shelfState = useSelector((state) => state.shelf);
    const dispatch = useDispatch();
const onFinish = async (values) => {
    await dispatch(createShelf(values));
    form.resetFields();
    await dispatch(getAllBookShelves());
  };
     function loadShelfs() {
        // if(shelfState.shelfList.length == 0) {
             dispatch(getAllBookShelves());
    // }
  }
    useEffect(() => {
        loadShelfs();
    }, []);

    return (
        <Layout>
          <div className="w-full">
            <div className='mt-10'>
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
    </div>           

        </Layout>
    );
}