import AuthWrapper from "@/utils/AuthWrapper";
import Navbar from "../(home)/_components/navbar";
import Footer from "../(home)/_components/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const isProtected = false;
    const redirectIfAuthenticated = '/dashboard';
    const redirectIfNotAuthenticated = '/sign-in';

    return (
        <>
            <AuthWrapper isProtected={isProtected} redirectIfAuthenticated={redirectIfAuthenticated} redirectIfNotAuthenticated={redirectIfNotAuthenticated} >
                <Navbar />
                <div className="my-12 flex items-center justify-center">
                    {children}
                </div>
            </AuthWrapper>
        </>
    );
}

export default AuthLayout;