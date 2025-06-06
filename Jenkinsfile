pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKER_IMAGE = 'realtime-chat-app'
        DOCKER_TAG = 'latest'
        DOCKERHUB_REPO = 'okejoshua/realtime-chat-app'
        APP_CONTEXT = './chat-app' // Adjusted to match your folder structure
    }

    parameters {
        booleanParam(name: 'DESTROY_INFRA', defaultValue: false, description: 'Check this to destroy Terraform infrastructure')
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

        stage('Docker Hub Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('Tag Image for Docker Hub') {
            steps {
                sh 'docker tag $DOCKER_IMAGE:$DOCKER_TAG $DOCKERHUB_REPO:$DOCKER_TAG'
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
                        cd ansible/
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

