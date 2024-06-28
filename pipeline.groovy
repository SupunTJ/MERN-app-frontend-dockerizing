pipeline {
    agent any

    stages {
        stage('SCM checkout') {
            steps {
                retry(3) {
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/SupunTJ/MERN-app-frontend-dockerizing.git']])
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t supun3998/frontend-app-image .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop and remove any existing container with the same name
                    sh 'docker stop supun3998-frontend-app-image-container || true'
                    sh 'docker rm supun3998-frontend-app-image-container || true'
                    // Run the new container
                    sh 'docker run -d -p 3001:3000 --name supun3998-frontend-app-image-container supun3998/frontend-app-image'
                }
            }
        }

      
        stage('Show Running Containers') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhubpwd', variable: 'Dockerhub')]) {
                    script {
                        sh "docker login -u supun3998 -p ${Dockerhub}"
                    }
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    retry(3) {
                        echo 'Pushing frontend image to Docker Hub...'
                        sh 'docker push supun3998/frontend-app-image'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}