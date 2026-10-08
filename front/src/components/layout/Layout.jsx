import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
    return (
        <div className="min-h-screen bg-[#090b10] text-white flex flex-col">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <div className="pr-24 md:pr-40 mb-8">
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
