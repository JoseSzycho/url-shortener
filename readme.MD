# **URL Shortener with Analytics** ✂️🔗📈

### **Overview**

The URL Shortener with Analytics project aims to develop an API that allows users to shorten long URLs into concise, shareable links while providing analytics on the usage of these links.

### **Features**

1. **URL Shortening:**
    - Users can input long URLs into the application.
    - The application generates a unique, shortened URL for each inputted long URL.
    - Shortened URLs redirect users to the original long URLs when accessed.
2. **Link Analytics:**
    - Users can view analytics for each shortened URL, including:
        - Total number of visits.
        - Referring websites or platforms.
        - Geographical location of visitors.
        - Time and date of visits.
    - Analytics data is presented in a user-friendly dashboard.
3. **User Authentication and Management:**
    - Users can sign up for an account to access the URL shortening and analytics features.
    - User authentication ensures the security and privacy of user data.
    - Account management functionalities allow users to update their profiles and manage their shortened URLs.
4. **Customizable Short URLs:**
    - Users have the option to customize the generated short URLs with personalized keywords or tags.
5. **RESTful API:**
    - The application provides a RESTful API that allows developers to integrate URL shortening and analytics functionalities into their own applications or services.
    - API endpoints include URL shortening, retrieving analytics data, and managing user accounts.

### **Technologies**

-   **Backend:** Node.js, Express.js, Prisma ORM
-   **Deployment:** Docker with internal network
-   **Database:** Postgres
-   **API Documentation:** Postman

### **Project Objectives**

-   Develop a user-friendly web API with an intuitive interface for URL shortening and analytics.
-   Implement robust backend functionalities and error catching.
-   Provide comprehensive API documentation for developers interested in integrating the application's functionalities into their projects.

### Documentation

https://documenter.getpostman.com/view/32838257/2sA2rB12vH

### Installation

It is important to follow the steps, as db must be started in order the app being able to perform the db migrations.

1. `CLONE` the repository

   `https://github.com/JoseSzycho/url-shortener.git`

2. `Compose` the database

   `docker compose -f docker-compose.db.yml up -d`
   
3. `Compose` the app 

   `docker compose -f docker-compose.app.yml up -d`

4. `Have fun`
