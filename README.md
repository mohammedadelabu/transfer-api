## Problem Description:

Imagine you are asked to develop a transfer service with APIs to transfer money between two accounts
My application have the following database structure

- COLLECTION 1 - transactions
  - reference (unique)
  - senderAccount nr
  - amount
  - receiverAccount nr
  - transferDescription
  - createdAt
  - updatedAt
- COLLECTION 2 - balances

  - account nr (unique, 10 digits)
  - balance (each user should get 5000 when they create an acct)
  - createdAt
  - updatedAt
  - userId

- COLLECTION 3 - users
  - firstName
  - lastname
  - DOB
  - email (unique)
  - phone number (unique)

The transaction Collection registers any transaction in an account (ie. today I paid N2000 for a movie with my card), the balances table represents the account balance of customers (ie. I have N50k in my bank account). If a sender is trying to make a transaction of an amount of money more than his current balance, an error would be returned indicating insufficient funds
The API can handle a transfer request of the form below and updates the transactions/balances table accordingly.

```
{
    senderAccount: account,
    receiverAccount: account,
    amount: money,
    transferDescription: transfer description
}
```

### Endpoints I used

| Method | Endpoint                           | Enable a user to:                                            |
| :----- | :--------------------------------- | :----------------------------------------------------------- |
| POST   | /signup                            | Enable user signup |
| POST   | /login                             | Enable user to login |
| POST   | /create-account                    | Enable user to create an account stored in the balance collection |
| GET    | /balance/:accountNumber            | Getting balance for a particular account number              |
|        | /balance/:userId                   | Getting balance for a particular user                        |
| GET    | /balance                           | Getting all accounts and their balance                       |
| POST   | /transfer                          | To make a transaction to another account                     |
| GET.   | /transaction/:accountNumber        | gets all transactions of a particular user                   |
| GET.   | /transaction/credit/:accountNumber | gets all credit transactions of a particular user            |
| GET.   | /transaction/debit/:accountNumber  | gets all debit transactions of a particular user             |

## Clarification
I implemented the following:
-  pagination, with limit of 5 values for each page
-  Authentication and Authorization for users using a middleware function
-  Validation for incoming request using Joi
- Only registered users can access all endpoints
- I used mongoDB-compass for local development

## Test coverage 

- I wrote test to cover the application using supertest
- I tested my database using mongodb-memory-server
- I tested all endpoints (GET, POST, PUT, DELETE)

## Documentation
- I documented my API with postman

## Hosting
- I host the application on Heroku
