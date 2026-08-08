Jenkins + Docker Deployment Setup

Step-by-Step Process

The following steps describe the basic setup for deploying a frontend and backend application using Jenkins and Docker.

1. Create an EC2 Instance

Create an EC2 instance on AWS.

2. Connect to the EC2 Instance

Connect to the EC2 instance using SSH or AWS CloudShell.

3. Install Required Tools

Install the following tools on the EC2 instance:

Git

Java 21

Docker

Jenkins

4. Open Jenkins

Open Jenkins in the browser and complete the initial Jenkins setup.

5. Create a Frontend Pipeline

Create a Jenkins pipeline for the frontend application.

6. Git Checkout

Jenkins checks out the project from GitHub.

GitHub
   ↓
Jenkins
   ↓
Git Checkout

7. Install Dependencies

Install the frontend project dependencies.

npm install

8. Build the Application

Build the frontend application.

npm run build

9. Deploy the Application

Deploy the built frontend application.

Docker-Based Deployment

When Docker is used with Jenkins, the deployment flow changes.

GitHub
   ↓
Jenkins
   ↓
Git Checkout
   ↓
Docker Build
   ↓
Docker Image
   ↓
Docker Container
   ↓
Application

Dockerfile

The Dockerfile should be stored inside the GitHub repository.

Example project structure:

Govt.scheems/
│
├── react/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
└── node/
    ├── Dockerfile
    ├── package.json
    └── index.js

Jenkins checks out the GitHub repository, including the Dockerfile, and then uses it to build the Docker image.

Important Concept

Git → Used to manage and download source code.

Jenkins → Used to automate the CI/CD pipeline.

Docker → Used to build images and run applications inside containers.

Dockerfile → Contains instructions for creating a Docker image.

The Dockerfile should be stored in GitHub so that Jenkins can automatically get it during Git checkout.

Final Flow

Developer
   ↓
GitHub
   ↓
Jenkins
   ↓
Git Checkout
   ↓
Docker Build
   ↓
Docker Image
   ↓
Docker Container
   ↓
Frontend / Backend Application

This approach allows Jenkins to automatically build and deploy the application whenever the project is updated.
