import AuthWrapper from "@/utils/AuthWrapper";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

    const isProtected = true;
    const redirectIfAuthenticated = '/'; 
    const redirectIfNotAuthenticated = '/sign-in';

    return (
        <div className="h-full flex items-center justify-center">
            <AuthWrapper isProtected={isProtected} redirectIfAuthenticated={redirectIfAuthenticated} redirectIfNotAuthenticated={redirectIfNotAuthenticated} >
                {children}
            </AuthWrapper>
        </div>
    );
}

export default AuthLayout;