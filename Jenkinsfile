pipeline {
  agent any

  environment {
    IMAGE_NAME = 'okejoshua/realtime-chat-app'
    DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
    SSH_CREDENTIALS_ID = 'ec2-ssh'
    EC2_HOST = '13.58.25.183'  // Replace with your actual deployment server IP
    DOCKERFILE_DIR = 'realtimechatapp/chatapp/'     // Update this to match your actual path
  }

  stages {
    stage('Clean Workspace Before Build') {
      steps {
        cleanWs()
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${IMAGE_NAME}", "${DOCKERFILE_DIR}")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push $IMAGE_NAME
          '''
        }
      }
    }

    stage('Deploy with Ansible') {
      steps {
        sshagent([SSH_CREDENTIALS_ID]) {
          sh '''
            cd realtimechatapp/ansible
            ansible-playbook -i inventory playbook.yml
          '''
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
    success {
      echo 'Deployment completed successfully!'
    }
    failure {
      echo 'Something went wrong. Check the logs.'
    }
  }
}
