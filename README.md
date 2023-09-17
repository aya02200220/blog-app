# NoirRose Blogging Platform

![NoirRose Logo](https://res.cloudinary.com/dmgelthfq/image/upload/v1694952182/White_Black_Bold_Minimalist_Beauty_Blogger_Logo_-_1_qh7rw1.png)

## Description

NoirRose is a modern blogging platform built with MERN Stack (MongoDB, Express, React, and Node.js). The application allows both guests and registered users to read blog posts. For additional features like posting blogs or adding to favorites, signing up is required.

In addition to traditional storage methods, NoirRose utilizes **Cloudinary** for efficient and seamless image hosting.

## Features

- Read blogs as a guest or registered user
- User authentication
- Create, edit, delete blog posts (for registered users)
- Add posts to your reading list (for registered users)
- Cloud-hosted images using Cloudinary

## Dependencies

The project uses the following npm packages:

- bcrypt
- cookie-parser
- cors
- express
- jsonwebtoken
- mongodb
- mongoose
- multer
- nodemailer
- nodemon
- cloudinary (for image hosting)

## How to Set Up Locally

### Prerequisites

- Node.js installed
- MongoDB instance running
- A Cloudinary account (for image hosting)

### Installation

1. Clone the repository

   ```
   git clone [Repository URL]
   ```

2. Navigate to the project directory

   ```
   cd NoirRose
   ```

3. Install the npm packages

   ```
   npm install
   ```

4. Create a `.env` file for environment variables such as database connection strings, secret keys, Cloudinary credentials, etc.

5. Start the development server

   ```
   npm run dev
   ```

## Author

AyaIshimura

## License

This project is licensed under the ISC License.
