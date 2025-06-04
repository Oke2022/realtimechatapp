pipeline {
  agent any

  environment {
    IMAGE_NAME = 'okejoshua/realtime-chat-app'
    DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
    SSH_CREDENTIALS_ID = 'ec2-ssh-key'
    EC2_HOST = '13.58.25.183'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git url: 'https://github.com/Oke2022/realtimechatapp.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build(IMAGE_NAME)
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
            cd ansible
            ansible-playbook -i inventory playbook.yml
          '''
        }
      }
    }
  }

  post {
    success {
      echo 'Deployment completed successfully!'
    }
    failure {
      echo 'Something went wrong. Check the logs.'
    }
  }
}
