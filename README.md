# SIT737-2025-Prac5P - Containerisation of a Simple Web Application using Docker

## 📝 Overview

This project demonstrates the containerisation of a simple Node.js web application using Docker and Docker Compose as part of the **SIT737 - Cloud Native Application Development** unit. The project includes a health check mechanism that restarts the container automatically if the application becomes unresponsive.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Docker
- Docker Compose


### Step 1: Clone the Repository

```bash
git clone https://github.com/programmerjahanzaib7/sit737-2025-prac5p.git
cd sit737-2025-prac5p
Step 2: Build the Docker Image
bash
Copy
Edit
docker build -t sit737-web-app .
Step 3: Run with Docker Compose
bash
Copy
Edit
docker-compose up
Step 4: Open in Browser
Go to: http://localhost:3000

You should see the message:

csharp
Copy
Edit
Hello from SIT737!
🐳 Dockerfile Overview
The Dockerfile performs the following steps:

Starts from an official Node.js base image.

Sets the working directory.

Installs dependencies listed in package.json.

Copies application files into the image.

Installs curl to support health checks.

Exposes port 3000.

Starts the application using npm start.

🧩 Docker Compose
The docker-compose.yml file defines how to run the containerized app. It:

Builds the image from the local Dockerfile.

Maps port 3000:3000.

Enables auto-restart.

Includes a health check to monitor application availability.

✅ Health Check Configuration (Part II)
A health check is included to detect failures and restart the container when necessary.

Docker Compose Health Check:

yaml
Copy
Edit
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
Dockerfile modification to include curl:

dockerfile
Copy
Edit
RUN apt-get update && apt-get install -y curl
📤 Optional: Push to Docker Hub
You can optionally tag and push your image to Docker Hub:

bash
Copy
Edit
docker tag calculator-app jahanzaibdev/calculator-app
docker push jahanzaibdev/calculator-app
📎 Submission Details
✅ Repository Name: sit737-2025-prac5p

✅ GitHub Link: https://github.com/programmerjahanzaib7/sit737-2025-prac5p

✅ Includes:

Dockerfile

docker-compose.yml

README.md

Application source code

✅ Health Check Implemented

✅ Documentation provided in this README

👨‍💻 Author
Muhammad Jahanzaib Khan
📧 Email: programmerjahanzaib7@gmail.com
🎓 Deakin University
📚 SIT737 - Cloud Native Application Development
