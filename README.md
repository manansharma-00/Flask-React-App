# Flask React Application

This repository contains a Flask backend and a React frontend, packaged together using Docker. The application is designed to demonstrate a full-stack development approach with RESTful API integration.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Technologies Used

- **Frontend**: 
  - React.js
  - Axios (for API calls)
  - Bootstrap (for styling)

- **Backend**: 
  - Flask
  - Flask-CORS (for Cross-Origin Resource Sharing)
  - SQLAlchemy (for database interactions)

- **Docker**: 
  - Docker Compose for container orchestration

## Features

- A responsive React frontend that interacts with the Flask backend.
- CRUD operations for user management.
- Dockerized environment for easy setup and deployment.

# Folder Structure

`/Assignment
│
├── /frontend                  # React frontend source code
│   ├── Dockerfile.client      # Dockerfile for frontend
│   ├── package.json          # Frontend dependencies
│   └── /src                  # React components
│
├── /backend                   # Flask backend source code
│   ├── Dockerfile.api        # Dockerfile for backend
│   ├── requirements.txt      # Backend dependencies
│   └── app.py               # Main Flask application
│
├── docker-compose.yml        # Docker Compose configuration
└── README.md                # Project documentation`

## Getting Started

### Prerequisites

- Docker installed on your machine.
- Basic understanding of Docker and containerization.

## Running the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/manansharma-00/Flask-React-App.git
   cd Flask-React-App
2. **Build and Start the Containers**:
   ```bash
   docker-compose up --build
3. **Access the Application**:
   - Frontend: Open your browser and navigate to http://localhost:5000.
   - Backend: You can access the backend API at http://localhost:3000.
4. **Stopping the Application**:
   To stop the application, press Ctrl + C in the terminal where Docker Compose is running. To remove all containers, run:
   ```bash
   docker-compose down

## API Endpoints

Here are the available API endpoints for the application:

- **GET** `/api/users` 
  - Retrieve a list of users.

- **POST** `/api/users` 
  - Create a new user. 

- **PUT** `/api/users/{id}` 
  - Update an existing user by their ID. 

- **DELETE** `/api/users/{id}` 
  - Delete a user by their ID.
