# Custom Short URL Backend

This repository contains the backend code for a website that allows users to create custom short URLs for long links. The backend is built using Express.js, Node.js, MongoDB, Cron, TypeScript, and integrates Clerk for authentication.

## Features

- **Custom Short URLs**: Users can create custom short URLs for their long links, making them easier to share.
- **Authentication**: Integration with Clerk provides secure user authentication.
- **Scheduled Tasks**: Cron is used to schedule tasks such as link expiration and cleanup.

## Tech Stack

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **MongoDB**: NoSQL database for storing link data.
- **Cron**: Used for scheduling recurring tasks.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Clerk**: Authentication and user management solution.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally or accessible remotely

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/custom-short-url-backend.git
   cd url-shortner-back
   
2. Install dependencies:
    ```bash
    npm install
3. Set up environment variables:

Create a .env file in the root directory.
Define the required environment variables such as database connection URI, Clerk credentials, etc.

4. Run the development server:
    ```bash
    npm run start

5.Access the backend API endpoints at http://localhost:5000.
### Contributing
Contributions are welcome! Feel free to submit pull requests or open issues for any bugs or feature requests.
