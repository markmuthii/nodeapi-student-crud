# Instructions

You are required to design a simple Node/Express Js application/api for a simple app.
Imagine a simple API where you can create a record for a student, fetch/read all the students,
update and delete a student. We do not need an API key to do this.

e.g.

an end point /api/v1/student (with POST method) will create a student record in the databases.
Students details is passes in the body

api/v1/student (with GET method) will read all students – pagination required

api/v1/student/{some id} (with GET method)will read a specific student record

api/v1/student/{some id} (with PUT method) will update a record. Details for update are put in the
body

api/v1/student/{some id} (with DELETE method) will delete a specific record.

# Implementation

## Endpoints

### 1. POST api/v1/student

- Request Body Data Format:

  ```JSON
  {
    "firstName": "John",
    "lastName" : "Doe",
    "email": "john@gmail.com",
    "phone": "0712345678",
    "city": "Nairobi",
    "studentId": "111111"
  }
  ```

- Response Data Format:
  ```JSON
  {
    "success": true,
    "data": {
        "id": 8,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@gmail.com",
        "phone": "0712345678",
        "studentId": "111111",
        "city": "Nairobi",
        "updatedAt": "2020-04-09T23:26:22.920Z",
        "createdAt": "2020-04-09T23:26:22.920Z"
    }
  }
  ```

### 2. GET api/v1/student/page/limit eg api/v1/student/1/2

- Response Data Format:
  ```JSON
  {
    "success": true,
    "data": [
        {
          "id": 5,
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@gmail.com",
          "phone": "0712345678",
          "studentId": "111111",
          "city": "Nairobi",
          "updatedAt": "2020-04-09T23:26:22.920Z",
          "createdAt": "2020-04-09T23:26:22.920Z"
        },
        {
            "id": 7,
            "firstName": "Mark",
            "lastName": "Muthii",
            "email": "mark@gmail.com",
            "phone": "0712345678",
            "studentId": "777111",
            "city": "Nairobi",
            "createdAt": "2020-04-09T22:32:00.000Z",
            "updatedAt": "2020-04-09T22:32:00.000Z"
        }
    ],
    "pagination": {
        "next": {
            "page": 2,
            "limit": 2
        }
    }
  }
  ```

### 3. PUT api/v1/student/studentId eg api/v1/student/111111

- Request Body Data Format:

  ```JSON
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@gmail.com",
    "phone": "0712345678",
    "city": "Nairobi",
  }
  ```

- Response Data Format:
  ```JSON
  {
    "success": true,
    "data": [
        1
    ]
  }
  ```

### 4. DELETE api/v1/student/studentId eg api/v1/student/111111

- Response Data Format:
  ```JSON
  {
    "success": true,
    "data": 1
  }
  ```

# Tech Stack

NodeJs, Express, MySQL
