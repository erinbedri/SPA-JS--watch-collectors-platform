# CHRONOS

#### By Erin Bedri
#### A simple JavaScript SPA for watch collectors.

## Description
This SPA allows users to create online representation of their watch collections. Users can register, login, add watches to their collections, browse other users' watches, like watches and comment.

## Features
* Registration (with username, email, password)
* Login (with email, password)
* Logout
* Dashboard (collection of all users' watches)
   ![Dashboard](./assets/screenshots/dashboard.JPG?raw=true "Dashboard")
* Add Watch (add a new watch to user's collection)
* My Watches (collection of user's personal watches)
* Comments (registered user is able to comment watches)
* Like and Likes (registered user is able to like other users' watches; number of likes are displayed for each watch)
* Details (for each watch)
* Edit (owner can update watch information)
* Delete (owner can delete watch from his collection)
* Pagination (on Dashboard)

## Technologies Used
* JavaScript
* Bootstrap
* HTML
* CSS
* LitHTML
* Page.js

## Setup/Installation Requirements
1. Clone this repository 
   ```sh
   git clone https://github.com/erinbedri/SPA-JS--watch-collectors-platform.git
   ```
2. Install the NPM packages 
   ```sh
   npm install
   ```
3. Run the http-server with the predefined command specified in the "start" property of the package's "scripts" object
   ```sh
   npm start
   ```
4. Navigate to the server directory
   ```sh
   cd server
   ```
5. Run the server
   ```sh
   node server.js
   ```

## Dependencies
* "lit-html": "1.3.0"
* "page": "1.11.6"

## Dev Dependencies
* "http-server": "0.12.3",
* "playwright-chromium": "1.9.2",
* "mocha": "8.3.2",
* "chai": "4.3.4"

## Contact
Erin Bedri: erinbedri@gmail.com

Project Link: https://github.com/erinbedri/SPA-JS--watch-collectors-platform.git

## License
Distributed under the MIT License.

Copyright (c) 2022 Erin Bedri