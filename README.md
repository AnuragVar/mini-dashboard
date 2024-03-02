# Social Media Analytics Dashboard

Welcome to the Social Media Analytics Dashboard! This application provides a simple and intuitive interface for monitoring social media analytics, drafting, and scheduling posts.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Assumptions](#assumptions)
- [Challenges and Solutions](#challenges-and-solutions)
- [Demo](#demo)

## Overview

This web application is built using Node.js for the backend and React for the frontend. The application interacts with a mock API (static JSON data) to display analytics such as likes, shares, and comments for social media posts. Users can also authenticate and draft/schedule new social media posts.

## Features

- Social media analytics display (likes, shares, comments).
- User authentication for secure access.
- Draft and schedule social media posts with title and description.

## Setup Instructions

### Backend (Node.js)

1. Clone the repository:

    ```bash
    git clone https://github.com/AnuragVar/mini-dashboard.git
    ```

2. Navigate to the Node.js backend folder:

    ```bash
    cd api
    ```

3. Install Node.js dependencies:

    ```bash
    npm install
    ```

4. Start the Node.js backend server:

    ```bash
    npm run dev
    ```

### Frontend (React)

1. Navigate to the frontend folder:

    ```bash
    cd client
    ```

2. Install React dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm run dev
    ```

4. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the dashboard.

## Usage

1. **Login**: Use the provided authentication system to log in.
2. **Analytics**: View social media analytics on the dashboard.
3. **Draft and Schedule Posts**: Create new social media posts with titles and descriptions, then schedule them for later.

## Assumptions

- The mock API (static JSON data) accurately represents real social media data.
- Users have basic knowledge of Node.js and React.
- The application is run in a development environment.

## Challenges and Solutions

- **Challenge:** Implementing user authentication.
  **Solution:** Utilized a token-based authentication system for secure user access.

- **Challenge:** Coordinating data flow between Node.js backend and React frontend.
  **Solution:** Implemented RESTful API endpoints for seamless communication.

## Demo

[Link to Demo Video](#) - [Drive Link](https://drive.google.com/file/d/1E6bNZmZ2nVEbO7StmI85eMiWQQsfdyDb/view?usp=sharing)
