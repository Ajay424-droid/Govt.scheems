# 🚀 Jenkins + Docker CI/CD Deployment

A practical DevOps deployment project using **AWS EC2, Git, Jenkins, Docker, React, and Node.js**.

---

## 🏗️ Architecture

```text
                    GitHub
                       |
              +--------+--------+
              |                 |
        Frontend Pipeline  Backend Pipeline
              |                 |
              v                 v
        Docker Build       Docker Build
              |                 |
              v                 v
      Frontend Image       Backend Image
              |                 |
              v                 v
      Frontend Container   Backend Container
              |                 |
            Port 80          Port 5000
              |                 |
              v                 v
          React App          Node.js API
☁️ EC2 Setup

Create an AWS EC2 instance and connect to it.

Install Git
sudo yum install git -y
Install Java 21
sudo yum install java-21-amazon-corretto -y
java -version
Install Docker
sudo yum install docker -y
sudo systemctl enable docker
sudo systemctl start docker
docker --version
Install Jenkins
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

sudo yum install jenkins -y

sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins

Open Jenkins:

http://EC2-PUBLIC-IP:8080

## 🏗️ 📂 Project Structure

Govt.scheems/
│
├── README.md
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

Frontend and backend use separate Dockerfiles because their environments are different.

🐳 Docker
Docker Flow
Dockerfile
     ↓
docker build
     ↓
Docker Image
     ↓
docker run
     ↓
Docker Container
     ↓
Application
Dockerfile

Contains instructions for building a Docker image.

Docker Image

A packaged application environment created from a Dockerfile.

Docker Container

A running instance of a Docker image.

🎨 Frontend Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
Build
docker build -t govt-frontend .
Run
docker run -d --name frontend -p 80:80 govt-frontend
Check
docker ps

Frontend:

http://EC2-PUBLIC-IP
⚙️ Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
Build
docker build -t govt-backend .
Run
docker run -d --name backend -p 5000:5000 govt-backend
Check
docker ps
Test
curl http://localhost:5000

Backend:

http://EC2-PUBLIC-IP:5000
🔄 Jenkins + Docker

The basic Docker Jenkins pipeline contains 3 main stages:

Git Checkout
      ↓
Docker Build
      ↓
Deploy

Jenkins gets the source code and Dockerfile from GitHub, builds the Docker image, and runs the Docker container.

🎨 Frontend Jenkins Pipeline
pipeline {
    agent any

    stages {

        stage('Git Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ajaypatel001/Govt.scheems.git'
            }
        }

        stage('Docker Build') {
            steps {
                dir('react') {
                    sh 'docker build -t govt-frontend .'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker stop frontend || true'
                sh 'docker rm frontend || true'
                sh 'docker run -d --name frontend -p 80:80 govt-frontend'
            }
        }
    }
}
Frontend Flow
GitHub
   ↓
Jenkins
   ↓
Git Checkout
   ↓
react/Dockerfile
   ↓
Docker Build
   ↓
govt-frontend Image
   ↓
frontend Container
   ↓
Port 80
   ↓
React Application
⚙️ Backend Jenkins Pipeline
pipeline {
    agent any

    stages {

        stage('Git Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ajaypatel001/Govt.scheems.git'
            }
        }

        stage('Docker Build') {
            steps {
                dir('node') {
                    sh 'docker build -t govt-backend .'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker stop backend || true'
                sh 'docker rm backend || true'
                sh 'docker run -d --name backend -p 5000:5000 govt-backend'
            }
        }
    }
}
Backend Flow
GitHub
   ↓
Jenkins
   ↓
Git Checkout
   ↓
node/Dockerfile
   ↓
Docker Build
   ↓
govt-backend Image
   ↓
backend Container
   ↓
Port 5000
   ↓
Node.js API
🔐 Jenkins Docker Permission

Jenkins needs permission to execute Docker commands.

sudo usermod -aG docker jenkins
sudo systemctl restart jenkins

Test:

sudo -u jenkins docker ps
🛠️ Important Docker Commands
Docker Images
docker images
docker build -t myapp .
docker pull nginx
docker rmi myapp
Docker Containers
docker ps
docker ps -a
docker run -d --name myapp -p 80:80 nginx
docker stop myapp
docker start myapp
docker restart myapp
docker rm myapp
Troubleshooting
docker logs myapp
docker logs -f myapp
docker inspect myapp
docker exec -it myapp sh
🔥 Why || true?

Used in Jenkins deployment:

docker stop frontend || true
docker rm frontend || true

If the old container does not exist, Docker returns an error.

|| true allows Jenkins to continue without failing the pipeline.

🌐 Frontend + Backend Deployment

Frontend and backend are deployed separately.

                         GitHub
                        /      \
                       ↓        ↓
              Frontend Pipeline  Backend Pipeline
                       ↓        ↓
                 Docker Build   Docker Build
                       ↓        ↓
                Frontend Image  Backend Image
                       ↓        ↓
              Frontend Container Backend Container
                       ↓        ↓
                     Port 80      Port 5000
                       ↓        ↓
                  React App     Node.js API
Frontend
Image:     govt-frontend
Container: frontend
Port:      80
Backend
Image:     govt-backend
Container: backend
Port:      5000
📌 Dockerfile in GitHub

Dockerfiles should be stored inside the GitHub repository.

Govt.scheems/
│
├── react/
│   └── Dockerfile
│
└── node/
    └── Dockerfile

Jenkins automatically gets the Dockerfile during Git Checkout.

GitHub
   ↓
Source Code + Dockerfile
   ↓
Jenkins Checkout
   ↓
Docker Build
   ↓
Docker Image
   ↓
Docker Container
🐍 Different Programming Languages

The basic Jenkins + Docker pipeline remains the same:

Git Checkout
      ↓
Docker Build
      ↓
Deploy

Dockerfile changes according to the application:

React    → React Dockerfile
Node.js  → Node.js Dockerfile
Python   → Python Dockerfile
Java     → Java Dockerfile
📚 Key DevOps Concepts
Technology	Purpose
Git	Version Control
GitHub	Source Code Repository
Jenkins	CI/CD Automation
Docker	Containerization
Dockerfile	Image Build Instructions
Docker Image	Packaged Application
Docker Container	Running Application
Nginx	Web Server
Terraform	Infrastructure as Code
🚀 Final CI/CD Flow
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
Stop Old Container
    ↓
Remove Old Container
    ↓
Run New Container
    ↓
Application Live 🚀
🎯 Final Summary

Git → Manages source code.

GitHub → Stores source code and Dockerfiles.

Jenkins → Automates CI/CD.

Docker → Builds images and runs containers.

Dockerfile → Contains instructions to build a Docker image.

Frontend
React → Dockerfile → Image → Container → Port 80
Backend
Node.js → Dockerfile → Image → Container → Port 5000
