import supertest from 'supertest';
import app from "../app";
// import { balance } from '../utils/interface';


let token: string;
let userId: string;
let accountNumber:string
// let ids: string;
let pageNo = 1

let registerData = {
    firstName: "naheem",
    lastName: "adedokun",
    DOB: "2009-07-10 14:00:00.000",
    email: "naheem@gmail.com",
    password: "123456",
    phoneNumber: "07065074554"
}
let loginData = {
  email: "naheem@gmail.com",
  password: "123456",
}

describe("POST/register",()=>{
    it("return status code 201", async()=>{
        const res = await supertest(app)
        .post("/api/v1/auth/register")
        .send(registerData)
        accountNumber = res.body.accountDetails.accountNumber
        console.log(accountNumber)
        expect(res.statusCode).toEqual(201)
    })

    test("login", async () => {
      const response = await supertest(app)
        .post("/api/v1/auth/login")
        .send(loginData);
      token = response.body.accessToken;
    
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      // expect(response.body.message).toBe("You are logged in");
  });


    test("All accounts and balances", async () => {
      const response = await supertest(app)
      .get("/api/v1/balance/1")
      .set("token", `Bearer ${token}`);
      console.log(token,'first');
      expect(response.statusCode).toBe(200);
  });

})

describe("balances", () => {
  console.log(token,'referrer');

  // test("Get Balance for an account", async () => {
  //   const response = await supertest(app)
  //     .get("/api/v1/balance/:accountNumber")
  //     .set("token", `Bearer ${token}`);
  //   expect(response.status).toBe(200);
  // });

  // test("Get Balance for a User", async () => {
  //     const response = await supertest(app)
  //       .get("/api/v1/balance/user/:userId")
  //       .set("token", `Bearer ${token}`);
  //     expect(response.status).toBe(200);
  // });

  
});

// describe("transactions", () => {
//   const transactionData = {
//       reference : "1234567890",
//       senderAccount : "1234567890",
//       receiverAccount: "8867156033",
//       amount : 500,
//       transferDescription: "My transfer"
//   }
//   test("make transfer", async () => {
//     const response = await supertest(app)
//       .post("/api/v1/transactions")
//       .set("token", `Bearer ${token}`)
//       .send(transactionData);
//       console.log(response.body)
//       let id:string = response.body.transactionDetails._id;
//       console.log(id)
//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe("A recipe has been created");

//   });
//   test("Get All Transactions for a User", async () => {
//     const response = await supertest(app)
//       .get("/api/v1/transactions/:accountNumber")
//       .set("token", `Bearer ${token}`);
//     expect(response.status).toBe(200);
//   });

//   test("Get All Debit Transactions for a User", async () => {
//     const response = await supertest(app)
//       .get("/api/v1/transactions/debit/:accountNumber")
//       .set("token", `Bearer ${token}`);
//     expect(response.status).toBe(200);
//   });

//   test("Get All Credit Transactions for a User", async () => {
//     const response = await supertest(app)
//       .get("/api/v1/transactions/credit/:accountNumber")
//       .set("token", `Bearer ${token}`);
//     expect(response.status).toBe(200);
//   });

// });