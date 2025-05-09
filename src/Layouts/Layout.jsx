import { Content } from "antd/es/layout/layout";
import CustomFooter from "Components/Footer/Footer";
import Navbar from "Components/Navbar/Navbar";

export default function Layout({children}) {
    return (
        <>
            <Navbar />
            {/* <div className="h-[calc(100vh-65px)] flex items-start justify-center">
                <div className="w-full h-full"> */}
                <Content className="h-[calc(100vh-128px)] flex ">
                    {children}
                </Content>
                {/* </div>
            </div> */}
            <CustomFooter />
        </>
    );
}