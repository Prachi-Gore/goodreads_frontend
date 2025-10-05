export type userStatusType={
id:string
username:string
status:'Accept_Reject'|'Add_Friend'| 'Pending' | 'Friends'  
}
export type UserStatusListType=userStatusType[]

export type quizType={
    question:string
    correct:string
    options:string[]
}
export type quizEvaluationType={
    score:number
    feedback:string
}