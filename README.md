# realtimechatapp

# Real-Time Chat Application

A modern, containerized real-time chat application built with Node.js and Socket.io, featuring automated deployment with Ansible and CI/CD pipeline with Jenkins.

## 🚀 Features

- Real-time messaging with Socket.io
- Responsive web interface
- Containerized with Docker
- Automated deployment with Ansible
- CI/CD pipeline with Jenkins
- Nginx reverse proxy configuration

## 📁 Project Structure

```
.
├── ansible/
│   ├── roles/
│   │   └── chatapp/
│   │       ├── handlers/
│   │       │   └── main.yml
│   │       ├── tasks/
│   │       │   └── main.yml
│   │       └── templates/
│   │           └── nginx.conf.j2
│   ├── inventory
│   └── playbook.yml
├── chat-app/
│   ├── public/
│   │   ├── js/
│   │   │   └── main.js
│   │   └── index.html
│   ├── package.json
│   └── server.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── Jenkinsfile
└── README.md
```

## 🛠️ Prerequisites

- **Docker** (version 20.0 or higher)
- **Node.js** (version 16 or higher)
- **Ansible** (version 2.9 or higher)
- **Jenkins** (for CI/CD pipeline)
- **Git**

## 🏃‍♂️ Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app-project
   ```

2. **Install dependencies**
   ```bash
   cd chat-app
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t chat-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 chat-app
   ```

## 🚀 Production Deployment with Ansible

### Setup

1. **Configure inventory**
   Update the `ansible/inventory` file with your target server details:
   ```ini
   [chatapp_servers]
   your-server-ip ansible_user=your-username
   ```

2. **Update Ansible variables**
   Modify variables in `ansible/roles/chatapp/tasks/main.yml` as needed.

### Deploy

Run the Ansible playbook:
```bash
cd ansible
ansible-playbook -i inventory playbook.yml
```

This will:
- Install Docker on the target server
- Build and deploy the chat application
- Configure Nginx as a reverse proxy
- Start all services

## 🔧 CI/CD Pipeline

The project includes a Jenkins pipeline (`Jenkinsfile`) that automates:

1. **Source Code Checkout**
2. **Dependency Installation**
3. **Testing** (if tests are configured)
4. **Docker Image Build**
5. **Deployment to Production**

### Jenkins Setup

1. Create a new Pipeline job in Jenkins
2. Point it to your repository
3. Jenkins will automatically detect the `Jenkinsfile`
4. Configure necessary credentials for deployment

## 📋 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Application port | `3000` |
| `NODE_ENV` | Environment mode | `production` |

### Nginx Configuration

The Nginx configuration is templated in `ansible/roles/chatapp/templates/nginx.conf.j2`. Key features:
- Reverse proxy to Node.js application
- WebSocket support for Socket.io
- Static file serving
- Gzip compression

## 🧪 Testing

```bash
cd chat-app
npm test
```

## 📊 Monitoring

- Application logs: `docker logs <container-name>`
- Nginx logs: `/var/log/nginx/`
- System metrics: Monitor CPU, memory, and network usage

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Kill the process or use a different port
   PORT=3001 npm start
   ```

2. **Docker build fails**
   ```bash
   # Clean Docker cache
   docker system prune
   
   # Rebuild without cache
   docker build --no-cache -t chat-app .
   ```

3. **Ansible deployment fails**
   ```bash
   # Test connectivity (run from ansible directory)
   cd ansible
   ansible -i inventory chatapp_servers -m ping
   
   # Run with verbose output
   ansible-playbook -i inventory playbook.yml -vvv
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

### Adding New Features

1. **Backend changes**: Modify `chat-app/server.js`
2. **Frontend changes**: Update files in `chat-app/public/`
3. **Deployment changes**: Update Ansible roles in `ansible/roles/chatapp/`

### Testing Locally

```bash
# Install dependencies
cd chat-app && npm install

# Start development server
npm run dev  # if you have nodemon configured
# or
npm start
```

## 🐳 Docker Commands

```bash
# Build image
docker build -t chat-app .

# Run container
docker run -d -p 3000:3000 --name chat-app-container chat-app

# View logs
docker logs chat-app-container

# Stop container
docker stop chat-app-container

# Remove container
docker rm chat-app-container
```

## 📚 Technology Stack

- **Backend**: Node.js, Express.js, Socket.io
- **Frontend**: HTML5, CSS3, JavaScript, Socket.io Client
- **Containerization**: Docker
- **Automation**: Ansible
- **CI/CD**: Jenkins
- **Web Server**: Nginx
- **Version Control**: Git

## 📄 Project

This project was done by Joshua Oke

---

**Happy Chatting! 💬**
