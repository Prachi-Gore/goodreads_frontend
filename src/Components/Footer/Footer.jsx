import {  BsCode, BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="h-16 relative left-0 !bottom-0 py-5 flex flex-col sm:flex-row items-center justify-between text-white sm:px-20 bg-red-950">
            <section>
            Copyright © 2023 | All rights reserved
            </section>
            <section className="flex items-center justify-center gap-3 text-2xl text-white">
                <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300" to='https://www.linkedin.com/in/prachi-gore-4772a11a5'>
                    <BsLinkedin />
                </Link>
                <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300" to='https://github.com/Prachi-Gore'>
                    <BsGithub />
                </Link>
                <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300" to=''>
                    <BsTwitter />
                </Link>
                <Link className="hover:text-yellow-500 transition-all ease-in-out duration-300" to='https://www.hackerrank.com/profile/prachi_gore'>
                    <BsCode/>
                </Link>
            </section>
        </footer>
    );
}