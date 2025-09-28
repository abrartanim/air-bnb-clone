# Airbnb Clone

This project is a full-stack Airbnb clone built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

*   Browse a list of properties
*   View detailed information for each property
*   View property images in a gallery
*   Check property availability with a date picker
*   View property location on a map
*   Read reviews from other users

## Technologies Used

**Frontend:**

*   React
*   TypeScript
*   Vite
*   Tailwind CSS
*   React Router
*   Axios
*   date-fns
*   Leaflet (for maps)
*   React Icons

**Backend:**

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   CORS
*   Dotenv

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18.x or later)
*   npm
*   MongoDB (local or a cloud instance)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/air-bnb-clone.git
    cd air-bnb-clone
    ```

2.  **Install server dependencies**
    ```sh
    cd server
    npm install
    ```

3.  **Install client dependencies**
    ```sh
    cd ../client
    npm install
    ```

4.  **Set up environment variables**

    In the `server` directory, create a `.env` file and add the following:

    ```
    MONGO_URI=<Your_MongoDB_Connection_String>
    PORT=5000
    ```

### Running the application

1.  **Start the server**

    In the `server` directory, run:

    ```sh
    npm run dev
    ```

    The server will start on `http://localhost:5000`.

2.  **Start the client**

    In the `client` directory, run:

    ```sh
    npm run dev
    ```

    The client will start on `http://localhost:5173`.

## Scripts

### Server

*   `npm start`: Starts the server in production mode.
*   `npm run dev`: Starts the server in development mode with nodemon.
*   `npm run data:import`: Imports data from `seeder.js` into the database.
*   `npm run data:destroy`: Destroys all data in the database.

### Client

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Lints the code.
*   `npm run preview`: Previews the production build.
