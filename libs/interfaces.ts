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
    postedJobs: Job[],
    // For user
    jobsApplied: Job[],
}

export interface Job {
    _id?:string,
    title:string,
    seniority:string,
    // Here, company id is provided, when user clicks on company's name on a job, it redirects to /companies/:id 
    companyId:string,
    tagId: string,
    description:string,
    lookingForDescription:string,
    companyOffersDescription:string,
    location:string,
    candidates: Candidate[]
}

// Short information about a user that will be displayed when user applies as a candidate for a job
export interface Candidate {
    userId:string,
    username:string,
}

export interface Tag {
    _id?:string,
    name:string,
    jobs: string[]
}