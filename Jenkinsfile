pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'DEPLOY',
            defaultValue: true,
            description: 'Deploy the built Storybook artifact after building'
        )

        string(
            name: 'DEPLOY_DIR',
            defaultValue: '/data/workspace/axiora-ui',
            description: 'Target directory to deploy the built Storybook files to (only used when DEPLOY is checked)'
        )
    }

    environment {
        DEPLOY_DIR = "${params.DEPLOY_DIR}"
    }

    stages {

        stage('Validate Config') {
            steps {
                script {
                    if (params.DEPLOY && !env.DEPLOY_DIR?.trim()) {
                        error "DEPLOY is checked but DEPLOY_DIR is empty. Provide a target directory or uncheck DEPLOY."
                    }

                    echo "DEPLOY      = ${params.DEPLOY}"

                    if (params.DEPLOY) {
                        echo "DEPLOY_DIR  = ${env.DEPLOY_DIR}"
                    } else {
                        echo "DEPLOY_DIR  = (skipped, DEPLOY is unchecked)"
                    }
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Environment') {
            steps {
                sh '''
                    echo "===== Node.js ====="
                    node --version

                    echo "===== npm ====="
                    npm --version

                    echo "===== pnpm ====="
                    pnpm --version

                    echo "===== Git ====="
                    git --version

                    echo "===== Branch ====="
                    echo "${BRANCH_NAME}"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    pnpm install --frozen-lockfile
                '''
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    echo "===== Running ESLint ====="
                    pnpm lint
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "===== Running Vitest ====="
                    pnpm test
                '''
            }
        }

        stage('Build Storybook') {
            steps {
                sh '''
                    echo "===== Building Storybook ====="
                    pnpm build-storybook
                '''
            }
        }

        stage('Verify Build Output') {
            steps {
                sh '''
                    if [ ! -d storybook-static ] || [ -z "$(ls -A storybook-static)" ]; then
                        echo "ERROR: storybook-static/ is missing or empty."
                        echo "Aborting deploy to avoid wiping the live site."
                        exit 1
                    fi

                    echo "===== Storybook build output ====="
                    du -sh storybook-static
                    find storybook-static -maxdepth 2 -type f | head -50
                '''
            }
        }

        stage('Verify Build Artifacts') {
            steps {
                sh '''
                    echo "===== Checking Storybook index ====="

                    if [ ! -f storybook-static/index.html ]; then
                        echo "ERROR: storybook-static/index.html is missing."
                        exit 1
                    fi

                    echo "OK: Storybook index.html exists."

                    echo "===== Checking JavaScript assets ====="

                    if ! find storybook-static -type f \\( -name "*.js" -o -name "*.mjs" \\) | grep -q .; then
                        echo "WARNING: No JavaScript assets were found."
                    else
                        echo "OK: JavaScript assets found."
                    fi
                '''
            }
        }

        stage('Package Artifact') {
            steps {
                sh """
                    tar -czf axiora-ui-storybook-${env.BUILD_NUMBER}.tar.gz \
                        -C storybook-static .
                """

                archiveArtifacts artifacts: "axiora-ui-storybook-${env.BUILD_NUMBER}.tar.gz",
                    fingerprint: true
            }
        }

        stage('Deploy') {
            when {
                expression {
                    return params.DEPLOY
                }
            }

            steps {
                sh '''
                    echo "===== Deploying Axiora UI Storybook ====="

                    mkdir -p "$DEPLOY_DIR"

                    rsync -a --delete \
                        storybook-static/ \
                        "$DEPLOY_DIR/"

                    echo "===== Deployment completed ====="
                    echo "Deployed to: $DEPLOY_DIR"
                '''
            }
        }
    }

    post {

        always {
            sh '''
                echo "===== Cleaning Jenkins workspace ====="

                rm -rf node_modules
                rm -rf storybook-static
                rm -rf dist
            '''
        }

        success {
            script {
                if (params.DEPLOY) {
                    echo "Axiora UI build and deployment succeeded."
                    echo "Deployed Storybook to: ${DEPLOY_DIR}"
                } else {
                    echo "Axiora UI build succeeded."
                    echo "DEPLOY was unchecked, so deployment was skipped."
                    echo "Download the Storybook artifact from this Jenkins build."
                }
            }
        }

        failure {
            echo "Axiora UI build/deploy failed — check the console log above."
        }
    }
}