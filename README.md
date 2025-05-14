# 🎙️ Audio Transcriber – Frontend Client

A robust frontend client for an audio transcription platform, built using **Angular**, **NgRx**, **ng-bootstrap**, and **AWS Amplify**.  
This application integrates **AWS Cognito** for user authentication, **AWS S3** for audio file storage, and **AWS Lambda** for triggering transcription logic.

---

## 🔧 Technologies Used

- [Angular](https://angular.io/) – Frontend framework
- [NgRx](https://ngrx.io/) – State management using Redux pattern
- [ng-bootstrap](https://ng-bootstrap.github.io/) – Bootstrap UI components for Angular
- [AWS Amplify](https://docs.amplify.aws/) – Interface for connecting to AWS services
- [AWS Cognito](https://aws.amazon.com/cognito/) – User authentication and authorization
- [AWS S3](https://aws.amazon.com/s3/) – Audio file storage
- [AWS Lambda](https://aws.amazon.com/lambda/) – Serverless backend logic for transcription

---

## ✨ Features

- 🔐 **Secure User Authentication** – Sign up, sign in, and session management via AWS Cognito
- 📤 **Audio File Upload** – Upload `.mp3`, `.wav`, or other formats to AWS S3
- 🧠 **Auto Transcription** – Automatically trigger Lambda function for transcription after upload
- 📄 **View Transcribed Text** – Display output text once transcription completes
- ⏳ **NgRx State Management** – Efficient handling of auth state, file upload progress, and transcription results
- 💡 **Bootstrap UI** – Clean, responsive UI with ng-bootstrap

---

## 🛠 Project Structure

