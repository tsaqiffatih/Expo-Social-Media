
---

# Expo Social Media

This is a social media application built with React Native Expo for Android. The app includes features such as user registration, login, posting, commenting, user search, following, and liking posts.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [License](#license)

## Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [GraphQL](https://graphql.org/)
- [MongoDB](https://www.mongodb.com/) (or any database of your choice)
- [JWT](https://jwt.io/) for Authentication

## Features

- User Registration
- User Login
- Add Post
- Show Post (sorted by newest)
- Comment on Post (Embedded Document)
- Search User (by name or username)
- Follow/Unfollow Users
- Display Followers and Following for each user (Reference with `$lookup`)
- Like Post
- Show total likes for each post

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/tsaqiffatih/Expo-Social-Media.git
    cd Expo-Social-Media
    ```

2. Install dependencies for the server:
    ```sh
    cd server
    npm install
    ```

3. Install dependencies for the client:
    ```sh
    cd ../client/tumblr
    npm install
    ```

## Environment Variables

Create a `.env` file in the `server` directory and add the necessary environment variables:

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_jwt_secret
```

## Running the Application

1. Start the server:
    ```sh
    cd server
    npm start
    ```

2. Start the app:
    ```sh
    cd ../client/tumblr
    npx expo start
    ```
    Use the Expo app on your Android device or emulator to run the application.

## Folder Structure

```
project-root/
├── server/      # Contains the GraphQL server application
└── client/      # Contains the React Native mobile application
    └── tumblr/  # Contains the main application code
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
