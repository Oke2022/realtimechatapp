pipeline { 
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') 
        DOCKER_IMAGE = 'realtime-chat-app'
        DOCKER_TAG = 'latest'
        DOCKERHUB_REPO = 'okejoshua/realtime-chat-app'
        APP_CONTEXT = './chat-app' // Adjusted to match your folder structure
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
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG $APP_CONTEXT'
            }
        }

        stage('Tag Image for Docker Hub') {
            steps {
                sh 'docker tag $DOCKER_IMAGE:$DOCKER_TAG $DOCKERHUB_REPO:$DOCKER_TAG'
            }
        }

        stage('Docker Hub Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker push $DOCKERHUB_REPO:$DOCKER_TAG'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sshagent(['ec2-ssh']) {
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
