pipeline {
    agent any

    environment {
<<<<<<< HEAD:waiting/Jenkinsfile.groovy
        DOCKER_IMAGE_NAME = 'kimyusan/ddib_waiting'
        DOCKERFILE_PATH = './waiting/Dockerfile'
        CONTAINER_NAME = 'ddib_wating'
=======
        DOCKER_IMAGE_NAME = 'kimyusan/ddib_user'
        DOCKERFILE_PATH = './user/Dockerfile'
        CONTAINER_NAME = 'ddib_user'
>>>>>>> ccf5a786b51751e935d64e7e563acbe2d9a584dd:user/Jenkinsfile.groovy
        REGISTRY_CREDENTIAL = 'dockerhub_IdPwd'
        DOCKER_IMAGE = ''
        DOCKER_IMAGE_TAG = 'latest'
    }
    stages {
        stage('GitLab Clone') {
            steps {
<<<<<<< HEAD:waiting/Jenkinsfile.groovy
                git branch : 'dev-gateway', credentialsId: 'jenkins', url: 'https://lab.ssafy.com/s10-final/S10P31C102.git'
=======
                git branch : 'dev-user', credentialsId: 'jenkins', url: 'https://lab.ssafy.com/s10-final/S10P31C102.git'
>>>>>>> ccf5a786b51751e935d64e7e563acbe2d9a584dd:user/Jenkinsfile.groovy
            }
        }

        stage('Gradle Build') {
            steps {
                echo 'Building..'
<<<<<<< HEAD:waiting/Jenkinsfile.groovy
                dir('./waiting') {
=======
                dir('./user') {
>>>>>>> ccf5a786b51751e935d64e7e563acbe2d9a584dd:user/Jenkinsfile.groovy
                    sh 'chmod +x gradlew'
                    sh './gradlew clean bootjar'
                }
            }
        }
        stage('Docker Build Image') {
            steps {
<<<<<<< HEAD:waiting/Jenkinsfile.groovy
                dir('./waiting') {
=======
                dir('./user') {
>>>>>>> ccf5a786b51751e935d64e7e563acbe2d9a584dd:user/Jenkinsfile.groovy
                    script {
                        DOCKER_IMAGE = docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}", "-f Dockerfile .")
                    }
                }
            }
        }
        stage('Push Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIAL) {
                        DOCKER_IMAGE.push()
                    }
                }
            }
        }
        stage('Delete Previous back Docker Container'){
            steps {
                script {
                    // 컨테이너가 실행중이 아니거나 중지되어 있는 경우 아무런 동작하지 않고 넘어가도록
                    sh "docker stop ${CONTAINER_NAME} || true"

                   def exitedContainers = sh(script: "docker ps --filter status=exited -q", returnStdout: true).trim()
                   if (exitedContainers) {
                       sh "docker rm ${exitedContainers}"
                   } else {
                       echo "No exited containers to remove."
                   }
                }
            }
        }

        stage('Prune Docker Object'){
            steps {
                echo '##### delete stopped containers, networks, volumes, images, cache... #####'
                script {
//                    sh "docker image prune -f"
                    sh "docker system prune --volumes -f"
                }
            }
        }

        stage('Pull from DockerHub') {
            steps {
                script {
                    sh 'docker pull ${DOCKER_IMAGE_NAME}'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
<<<<<<< HEAD:waiting/Jenkinsfile.groovy
                    sh 'docker run -d --name ${CONTAINER_NAME} -p 9010:9010 ${DOCKER_IMAGE_NAME}'
=======
                    sh 'docker run -d --name ${CONTAINER_NAME} -p 8081:8081 ${DOCKER_IMAGE_NAME}'
>>>>>>> ccf5a786b51751e935d64e7e563acbe2d9a584dd:user/Jenkinsfile.groovy
                }
            }
        }
    }
}
