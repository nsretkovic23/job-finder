export interface AuthState  {
    isAuth:Boolean,
    username:string,
    password:string,
    uid: string,
}

export interface LoginPayload {
    username:string,
    password:string
}

export interface User {
    _id?:string,
    fullName:string,
    username:string,
    password:string,
    description:string,
    isCompany:boolean,
    rating:number[],
    // For company
    postedJobs: ShortJobInfo[],
    // For user
    jobsApplied: ShortJobInfo[],
}

export interface Job {
    _id?:string,
    title:string,
    seniority:string,
    // Here, company id is provided, when user clicks on company's name on a job, it redirects to /companies/:id 
    companyInfo:ShortCompanyInfo[]
    tagName: string,
    description:string,
    lookingForDescription:string,
    companyOffersDescription:string,
    location:string,
    candidates: Candidate[]
}

export interface Tag {
    _id?:string,
    name:string,
    jobs: string[]
}

// Short information about a user that will be displayed when user applies as a candidate for a job
export interface Candidate {
    userId:string,
    username:string,
}

export interface ShortJobInfo {
    jobId:string,
    jobTitle:string
}

export interface ShortCompanyInfo {
    companyId?:string,
    companyName:string
}

export interface ShortTagInfo {
    tagId:string,
    tagName:string
}

export interface LoginCredentials {
    username:string,
    password:string,
    isCompany?:boolean
}