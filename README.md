<h1 align="center">Ledger.Flow$</h1>
<br>
<p align="center"><b>Page for personal finance control 💰</b></p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/calebesg/ledgerflow">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/calebesg/ledgerflow">

  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License MIT">
  </a>
</p>
<br>

<p align="center">
  <img width="1600" height="910" alt="Image" src="https://github.com/user-attachments/assets/ebc2ef9c-3d01-4714-8f77-0c252326b8c0" />
</p>

<hr />

## 🏷️ About
Full stack financial management application designed to help users track income and expenses, providing clear insights into their financial data. 
The system features a secure backend built with Java and Spring Boot, including JWT-based authentication, RESTful APIs, and structured business logic. 
It also includes a dynamic dashboard and PDF report generation.

## 💻 Technologies
This app features all the latest tools and practices in web development!

#### Back-End
- Java
- Spring Boot
- Spring Security (JWT)
- JPA / Hibernate
- H2 Database

#### Front-End
- Angular
- TypeScript
- Tailwind CSS

---

## ✨ Features

- JWT-based authentication
- User registration and login
- Financial transactions CRUD operations
- Dashboard with:
  - Total income
  - Total expenses
  - Consolidated balance
- Transaction filtering by user
- Soft delete for records
- PDF report generation
- Global exception handling
- Data validation using Bean Validation

---

## 📡 API

#### POST /auth/login
Performs user authentication.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
#### POST /auth/register
Returns the organization data of the authenticated user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "organizationName": "string",
  "purpose": "string",
  "reportTitle": "string"
}
```
#### GET /organization
Returns the organization data of the authenticated user.

#### POST /transaction/new
Create a new financial transaction.

**Request Body:**
```json
{
  "description": "string",
  "transactionDate": "yyyy-MM-dd",
  "transactionType": "INCOME | EXPENSE",
  "amount": 0.0
}
```

#### GET /transaction/list
Returns the list of transactions of the authenticated user, ordered by date (most recent first).

#### DELETE /transaction/{id}
Returns the list of transactions of the authenticated user, ordered by date (most recent first).

---

## 🏃💨 Getting started

1. Clone this repo with ``git clone https://github.com/calebesg/ledgerflow.git``
2. Move yourself to the proffy directory: ``cd ledgerflow``

### ☁️ Getting started server

1. Move yourself to the backend directory: ``cd backend``
2. Run ``./mvnw spring-boot:run`` install all dependencies and start server

### 💻 Getting started web

1. Move yourself to the frontend directory: ``cd frontend``
2. Run ``npm install`` to install all dependencies
3. Run ``npm start OR ng server`` to start project

---

## 📌 Next Improvements

- [ ] Advanced filters (date, category)
- [ ] Refresh token implementation
- [ ] PostgreSQL integration
- [ ] Docker containerization for the application
- [ ] Application deployment



