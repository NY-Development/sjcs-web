# SJCS Backend API

RESTful API for the SJCS Web platform using Node.js, Express, MongoDB, and JWT auth.

## Quick Start

1) Install dependencies

```
npm install
```

2) Configure environment

Copy `.env.example` to `.env` and fill values:

```
PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
NODE_ENV=development
```

3) Run the server

```
npm run dev
```

## ESM Note

This backend uses ES Modules. Local imports include the `.js` extension and
`package.json` sets `"type": "module"`.

## API Base

All routes are prefixed with `/api`.

- POST `/api/auth/signup`
- POST `/api/auth/login`
- POST `/api/auth/refresh`
- POST `/api/auth/logout`

## Postman Test Payloads

Set these Postman variables (optional but recommended):

```
baseUrl = http://localhost:5000/api
accessToken = <access_token>
refreshToken = <refresh_token>
userId = <user_object_id>
studentId = <student_object_id>
teacherId = <teacher_object_id>
classId = <class_object_id>
subjectId = <subject_object_id>
gradeId = <grade_object_id>
paymentId = <payment_object_id>
attendanceId = <attendance_object_id>
notificationId = <notification_object_id>
```

Auth

```
POST {{baseUrl}}/auth/signup
Content-Type: application/json

{
  "firstName": "Jordan",
  "lastName": "Lee",
  "email": "jordan.lee@example.com",
  "password": "Secret123",
  "role": "Student"
}
```

```
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "jordan.lee@example.com",
  "password": "Secret123"
}
```

```
POST {{baseUrl}}/auth/refresh
Content-Type: application/json

{
  "refreshToken": "{{refreshToken}}"
}
```

```
POST {{baseUrl}}/auth/logout
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "refreshToken": "{{refreshToken}}"
}
```

Students

```
POST {{baseUrl}}/students
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "user": "{{userId}}",
  "studentId": "STU-1001",
  "class": "{{classId}}",
  "guardianName": "Pat Lee",
  "guardianEmail": "pat.lee@example.com"
}
```

```
GET {{baseUrl}}/students
Authorization: Bearer {{accessToken}}
```

```
GET {{baseUrl}}/students/{{studentId}}
Authorization: Bearer {{accessToken}}
```

```
PUT {{baseUrl}}/students/{{studentId}}
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "guardianName": "Alex Lee"
}
```

```
DELETE {{baseUrl}}/students/{{studentId}}
Authorization: Bearer {{accessToken}}
```

Teachers

```
POST {{baseUrl}}/teachers
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "user": "{{userId}}",
  "employeeId": "EMP-9001",
  "subjects": ["{{subjectId}}"]
}
```

```
GET {{baseUrl}}/teachers
Authorization: Bearer {{accessToken}}
```

```
GET {{baseUrl}}/teachers/{{teacherId}}
Authorization: Bearer {{accessToken}}
```

```
PUT {{baseUrl}}/teachers/{{teacherId}}
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "subjects": ["{{subjectId}}"]
}
```

```
DELETE {{baseUrl}}/teachers/{{teacherId}}
Authorization: Bearer {{accessToken}}
```

Classes

```
POST {{baseUrl}}/classes
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "name": "10-A",
  "gradeLevel": "10",
  "teacher": "{{teacherId}}",
  "subjects": ["{{subjectId}}"]
}
```

```
GET {{baseUrl}}/classes
Authorization: Bearer {{accessToken}}
```

```
GET {{baseUrl}}/classes/{{classId}}
Authorization: Bearer {{accessToken}}
```

```
PUT {{baseUrl}}/classes/{{classId}}
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "gradeLevel": "10"
}
```

```
DELETE {{baseUrl}}/classes/{{classId}}
Authorization: Bearer {{accessToken}}
```

Subjects

```
POST {{baseUrl}}/subjects
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "name": "Mathematics",
  "code": "MATH-10",
  "teacher": "{{teacherId}}"
}
```

```
GET {{baseUrl}}/subjects
Authorization: Bearer {{accessToken}}
```

```
GET {{baseUrl}}/subjects/{{subjectId}}
Authorization: Bearer {{accessToken}}
```

```
PUT {{baseUrl}}/subjects/{{subjectId}}
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "code": "MATH-10A"
}
```

```
DELETE {{baseUrl}}/subjects/{{subjectId}}
Authorization: Bearer {{accessToken}}
```

Grades

```
POST {{baseUrl}}/grades
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "student": "{{studentId}}",
  "subject": "{{subjectId}}",
  "score": 88,
  "term": "Fall 2026"
}
```

```
GET {{baseUrl}}/grades
Authorization: Bearer {{accessToken}}
```

```
GET {{baseUrl}}/grades/{{gradeId}}
Authorization: Bearer {{accessToken}}
```

```
PUT {{baseUrl}}/grades/{{gradeId}}
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "score": 91
}
```

```
DELETE {{baseUrl}}/grades/{{gradeId}}
Authorization: Bearer {{accessToken}}
```

Payments

```
POST {{baseUrl}}/payments
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "student": "{{studentId}}",
  "amount": 450.00,
  "dueDate": "2026-03-01T00:00:00.000Z"
}
```

```
GET {{baseUrl}}/payments
Authorization: Bearer {{accessToken}}
```

```
GET {{baseUrl}}/payments/{{paymentId}}
Authorization: Bearer {{accessToken}}
```

```
PUT {{baseUrl}}/payments/{{paymentId}}
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "amount": 500.00
}
```

```
POST {{baseUrl}}/payments/{{paymentId}}/mark-paid
Authorization: Bearer {{accessToken}}
```

```
DELETE {{baseUrl}}/payments/{{paymentId}}
Authorization: Bearer {{accessToken}}
```

Attendance

```
POST {{baseUrl}}/attendance
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "student": "{{studentId}}",
  "date": "2026-02-11T00:00:00.000Z",
  "status": "Present",
  "note": "On time"
}
```

```
GET {{baseUrl}}/attendance
Authorization: Bearer {{accessToken}}
```

```
GET {{baseUrl}}/attendance/{{attendanceId}}
Authorization: Bearer {{accessToken}}
```

```
PUT {{baseUrl}}/attendance/{{attendanceId}}
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "status": "Late",
  "note": "Arrived at 8:10 AM"
}
```

```
DELETE {{baseUrl}}/attendance/{{attendanceId}}
Authorization: Bearer {{accessToken}}
```

Notifications

```
POST {{baseUrl}}/notifications
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "user": "{{userId}}",
  "title": "Payment Reminder",
  "message": "Your tuition payment is due on March 1.",
  "type": "Payment"
}
```

```
GET {{baseUrl}}/notifications
Authorization: Bearer {{accessToken}}
```

```
GET {{baseUrl}}/notifications/{{notificationId}}
Authorization: Bearer {{accessToken}}
```

```
PUT {{baseUrl}}/notifications/{{notificationId}}
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "isRead": true
}
```

```
DELETE {{baseUrl}}/notifications/{{notificationId}}
Authorization: Bearer {{accessToken}}
```

## Modules

- Users and roles (Admin, Teacher, Student, Parent)
- Students, Teachers, Classes, Subjects
- Grades, Attendance, Payments, Notifications

## Structure

```
Backend/
  src/
    config/
    controllers/
    services/
    models/
    routes/
    middleware/
    utils/
    jobs/
    sockets/
```

## Notes

- Refresh tokens are hashed and stored in the `User` model.
- Penalty job is in `src/jobs/paymentPenalty.job.js`.
- `src/sockets/notifications.socket.js` is a lightweight event emitter placeholder.
