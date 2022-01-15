export interface user {
    firstName? : string
    lastName?: string
    DOB?: Date
    email: string
    password:string
    phoneNumber?: string
}
export interface balance {
    userId? : string
    balance: number
    accountNumber: number
    updateDate: Date | null
}
export interface transactions {
    reference: string
    senderAccountNumber: string
    amount: number
    receiverAccountNumber: string
    transferDescription: string
}

export interface customError{
    statusCode: any
}
// export interface IUser{
//     [x: string]: any
//     id: number
//     authData:any
//     token: string
//     jwt: string
//     hash: any
//     err: any
//     accessToken: string
//     success:boolean
//     status:number
//     message: string
//     data: object
// }

export interface register {
    fullname: string
    email: string
    password: string
}

export interface login {
    fullname: string
    email: string
    password: string
}