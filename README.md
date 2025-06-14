Overview
A React application to display public posts fetched from a backend API. Users can browse posts with pagination, view detailed post content in a modal, and manage their own posts (edit/delete) if logged in.

Features
Fetch and display posts with pagination

View post details in a modal popup

Edit and delete posts for authenticated users

Responsive layout using Bootstrap

Graceful image loading with fallback placeholders

Technologies Used
React.js (functional components and hooks)
Asp.Net (Backend & My Custom Api)

Axios for API requests

React Router for navigation

React Bootstrap for UI components

JWT for user authentication (token handled separately)

Getting Started
Prerequisites
Node.js and npm installed

Installation
Clone the repo:

bash
git clone https://github.com/yourusername/public-posts-react.git
cd public-posts-react
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
Open your browser at http://localhost:3000

Configuration
Make sure to update the API base URL in your axios calls inside the project to match your backend server.

Handle JWT tokens for authentication in your auth utilities.

Usage
Browse posts on the home page.

Click View to see post details.

Authenticated users can edit or delete their own posts.

Use pagination controls to navigate between pages of posts.

Notes
This project assumes you have a backend API running with CORS enabled.

Adjust the posts per page and styles as needed.

License
MIT License
