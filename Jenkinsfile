pipeline {
  agent any

  environment {
    IMAGE_NAME = 'okejoshua/realtime-chat-app:latest'
    DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
    SSH_CREDENTIALS_ID = 'ec2-ssh'
    EC2_HOST = '13.58.25.183'
  }

  stages {
    stage('Clean Workspace') {
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
          dockerImage = docker.build("${IMAGE_NAME}")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            sh '''
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push $IMAGE_NAME
            '''
          }
        }
      }
    }

    stage('Deploy to EC2 with Ansible') {
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
      echo '✅ Deployment completed successfully!'
    }
    failure {
      echo '❌ Something went wrong. Check the logs.'
    }
  }
}
