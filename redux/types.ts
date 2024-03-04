// Auth Types
export interface IAuthParams {
    username: string;
    password: string;
}
export interface ILoginResult{
    access_token: string;
    token_type: string;
} 
export interface ISignUpResult{
    email: string;
    id: number;
    name: string;
    education: string;
    role: string;
    created_at: string;
}
export interface IRefreshResponse{
    access_token: string;
    token_type: string;
}

// User Types
export interface IUser{
    email: string;
    id: number;
    name: string;
    education: string;
    role: string;
    created_at: string;
}


// Course Types
export interface ICourseResponse{
    id: number;
    course_name: string;
    description: string;
    teacher: string;
    img_url: string;
    course_code: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    category: number;
}

export interface ICourseGetResponse{
    Course: {
        id: number;
        course_name: string;
        description: string;
        teacher: string;
        img_url: string;
        course_code: string;
        is_published: boolean;
        created_at: string;
        updated_at: string;
        category: number;
    }
    enrollments: number;
}

export interface ICourse extends ICourseResponse {
    enrollments: number;
}

// Category Types
export interface ICategoryResponse{
    id: number;
    cate_name: string;
}

// Chapter types
export interface IChapterResponse{
    id: number;
    title: string;
    description: string;
    chapter_no: number;
    video_url: string;
    resources_url: string;
    is_published: true;
    course_id: number;
    created_at: string;
}

// Enrollments types
export interface IEnrollment{
    user_id: number;
    course_id: number;
    enroll_at: string;
}