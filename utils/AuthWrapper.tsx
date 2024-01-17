"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectIsAuthenticated } from "@/redux/features/auth/authSlice";

interface AuthWrapperProps {
  children: React.ReactNode;
  isProtected: boolean;
  redirectIfAuthenticated: string;
  redirectIfNotAuthenticated: string;
}

const AuthWrapper = ({
  children,
  isProtected,
  redirectIfAuthenticated,
  redirectIfNotAuthenticated
}: AuthWrapperProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated and tries to access protected route, redirect to sign up page.
    if (!isAuthenticated && isProtected) {
      router.push(redirectIfNotAuthenticated);
    }

    // If user is authenticated and trying to access login/signup route, redirect to protected route
    if (isAuthenticated && !isProtected) {
      router.push(redirectIfAuthenticated);
    }
  }, [isAuthenticated, isProtected, redirectIfAuthenticated, redirectIfNotAuthenticated, router]);

  if((!isAuthenticated && isProtected) || (isAuthenticated && !isProtected)){
    return null;
  }

  return (
    <>{children}</>
  )
}

export default AuthWrapper;