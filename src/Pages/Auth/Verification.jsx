import { Input } from "antd";

export default function Verifiction(){
    return (
        <div>
            Verifiction visit amazon website
            <Input.OTP variant="filled" length={6} />
        </div>
    );
}