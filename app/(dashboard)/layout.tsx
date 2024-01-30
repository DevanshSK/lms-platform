import AuthWrapper from "@/utils/AuthWrapper";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

    const isProtected = true;
    const redirectIfAuthenticated = '/dashboard/'; 
    const redirectIfNotAuthenticated = '/sign-in';

    return (
        <div className="h-full">
            <AuthWrapper isProtected={isProtected} redirectIfAuthenticated={redirectIfAuthenticated} redirectIfNotAuthenticated={redirectIfNotAuthenticated} >
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
                {children}
            </main>
            </AuthWrapper>
        </div>
    );
}

export default AuthLayout;