# CodeAlpha Job Board Platform

A RESTful Job Board Platform API built with Node.js, Express.js, MongoDB, and Mongoose.

## Project Overview

The Job Board Platform is a backend REST API that allows employers to create job listings and candidates to manage their profiles, upload resumes, and apply for jobs.

The system also allows employers to manage applications and update application statuses.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* dotenv
* REST API
* Git & GitHub

## Main Features

### Employer Management

* Create employers
* View all employers
* View employer details
* Update employer information
* Delete employers

### Job Management

* Create job listings
* View all jobs
* View job details
* Update job listings
* Delete job listings
* Activate or deactivate jobs
* Store job type, experience level, salary and required skills

### Candidate Management

* Create candidate profiles
* View candidates
* View candidate details
* Update candidate information
* Delete candidates
* Store skills and education information

### Resume Management

* Upload candidate resumes
* Store resume file information
* Retrieve resumes for a specific candidate
* Support PDF resume uploads

### Application Management

* Apply for jobs
* Prevent duplicate applications
* Require a candidate-specific resume
* View all applications
* View application details
* Update application status

### Application Statuses

Applications can have the following statuses:

* Applied
* Shortlisted
* Interview
* Selected
* Rejected

## Project Structure

```text
CodeAlpha_JobBoardPlatform/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── applicationController.js
│   ├── candidateController.js
│   ├── employerController.js
│   ├── jobController.js
│   └── resumeController.js
│
├── middleware/
│   └── upload.js
│
├── models/
│   ├── Candidate.js
│   ├── Employer.js
│   ├── JobApplication.js
│   ├── JobListing.js
│   └── Resume.js
│
├── routes/
│   ├── applicationRoutes.js
│   ├── candidateRoutes.js
│   ├── employerRoutes.js
│   ├── jobRoutes.js
│   └── resumeRoutes.js
│
├── uploads/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## API Endpoints

### Employers

```text
GET    /api/employers
GET    /api/employers/:id
POST   /api/employers
PATCH  /api/employers/:id
DELETE  /api/employers/:id
```

### Jobs

```text
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PATCH  /api/jobs/:id
DELETE  /api/jobs/:id
```

### Candidates

```text
GET    /api/candidates
GET    /api/candidates/:id
POST   /api/candidates
PATCH  /api/candidates/:id
DELETE  /api/candidates/:id
```

### Resumes

```text
POST   /api/resumes/upload
GET    /api/resumes/candidate/:candidateId
```

### Applications

```text
GET    /api/applications
GET    /api/applications/:id
POST   /api/applications
PATCH  /api/applications/:id/status
```

## Installation

Clone the repository:

```bash
git clone https://github.com/iqrak5143-sketch/CodeAlpha_JobBoardPlatform.git
```

Navigate to the project directory:

```bash
cd CodeAlpha_JobBoardPlatform
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/job_board
```

## Run the Project

Start the server:

```bash
node server.js
```

The API will run on:

```text
http://localhost:3000
```

## Testing

The API was tested using Postman.

Tested functionality includes:

* Employer creation and retrieval
* Job creation and retrieval
* Candidate creation and retrieval
* Resume upload
* Job applications
* Duplicate application validation
* Application status updates
* Application retrieval with populated job, candidate and resume data

## Author

**Iqra Khan**

Backend Development Project
<br>
CodeAlpha Internship
