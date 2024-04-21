
![sunflowers](./src/images/sunflowers.jpg)

# Garden Nook

Welcome to <strong>Garden Nook</strong>! This application helps you keep track of your plants and their care routines. Whether you're a seasoned plant parent or just starting out, this app will assist you in providing the best care for your green friends.

To use the web application navigate to: (netlify link goes here)

The data looks like this: (put the render link here)
---
### Getting Started

To get started with the Plant Care Application on your local machine follow these steps:

1. **Clone the Repository:** 
   Navigate to the front end repository: https://github.com/JuliGarc91/jwt-auth-frontend and follow these instructions:

   Fork and clone this **frontend repository** to your local machine using the following command:
   ```
   git clone https://github.com/JuliGarc91/jwt-auth-frontend.git
   ```
   
2. **Set Up the Database:**
   navigate to https://github.com/JuliGarc91/jwt-auth-backend and follow these instructions:

   Fork and clone the **backend repository** to your local machine using the following command:
   ```
   git clone https://github.com/JuliGarc91/jwt-auth-backend.git
   ```

3. **Install Dependencies:**
   - Navigate to the root directory of the cloned repositories.
   - Run the following command to install the required dependencies:
     ```
     npm install
     ```
   - In backend repository run `npm run db:init` then run `npm run db:seed` in your terminal to get data from postgreSQL database.
   
4. **Environment Variables:**
   - Create a `.env` file in the root directory of the project.
   - Define the following environment variables in the `.env` file:
     ```
     DATABASE_URL=<your-database-connection-url>
     VITE_BASE_URL=http://localhost:3000
     ```
   - Replace `<your-database-connection-url>` with the connection URL for your PostgreSQL database.

5. **Run the Application:**
   - Once the dependencies are installed and the environment variables are set up, run the following command to start the application:
     ```
     npm start
     ```
   - The application should now be running locally. You can access it in your web browser at `http://localhost:3000`.

6. **Explore and Enjoy!**
   - You're all set! Explore the features of the Plant Care Application, add your plants, log care activities, and keep your green companions happy and healthy.

---

### Additional Notes
Backend:
- **Database Schema:** Refer to the `schema.sql` file in the `db` directory for the database schema and table structure.
- **API Endpoints:** Explore the API endpoints in the `controllers` directory to understand how data is fetched and manipulated.

Frontend:
- **React Components:** Dive into the `src` directory to explore the React components responsible for rendering the user interface and handling user interactions.

Now you're ready to start using the Plant Care Application on your local machine! Happy plant caring! 🌱🌿

## User Interface

Interact with the application through a user-friendly web interface. Here's how you can use the main features:

### Login and Registration Components

The Login and Registration components provide authentication functionality for accessing the Garden Nook application. Here's how you can use them:

**Login Component:**
1. Enter your username and password in the provided fields, then click the "Submit" button to log in.
2. Alternatively, you can use the "Demo User" button to log in with pre-defined demo credentials.
3. After successful authentication, you'll be redirected to the dashboard page of the application.

**Registration Component:**
1. Fill in the username, email, and password fields in the registration form.
2. Click the "Submit" button to register your account.
3. If registration is successful, you'll be logged in automatically and redirected to the dashboard.

### SearchBar Component

The SearchBar component allows you to search for plant species using the provided search input. Here's how you can use it:

1. **Search Plants**: Enter a search query into the input field to search for plant species matching the query.
2. **Loading Indicator**: While the search results are being fetched, a loading indicator will be displayed.
3. **Display Results**: Once the search results are fetched, they will be displayed below the search input.
4. **Plant Information**: Each search result will display the common name, scientific name, cycle, watering information, and other names (if available) for the plant species.
5. **Image Display**: If available, an image of the plant species will be displayed alongside its information.

### Adding Plants

To add a new plant to your collection, follow these steps:

1. Click on the "Add Plant" button.
2. Fill in the details for your plant, including its name, species, color, and other relevant information.
3. Optionally, you can upload a picture of your plant to help you identify it easily.
4. Click on the "Submit" button to save your plant details.

### Viewing Index and Plant Details

You can view all your plants on the index page. You can also view detailed information about each of your plants by clicking on its name or picture. This will take you to a page where you can see specifics such as species, color, and care instructions.

### Editing Plant Details

If you need to update any details about your plant, follow these steps:

1. Click on the "Edit Plant" button on the plant details page.
2. Make the necessary changes to the plant information.
3. Click on the "Submit" button to save your edits.

### Logging Care Activities

Keeping track of your plant care activities is essential for its health. Here's how you can log care activities:

1. Navigate to the plant's details page.
2. Click on the "Plant Care Logs" button.
3. Enter details such as care date, description, and any other relevant information.
4. Click on the "Submit" button to save the care log.

### Viewing Growth Chart

You can monitor your plant's growth over time through a visual chart. This chart displays data such as height, sunlight hours, and water added daily.

### Deleting Plants or Care Logs

If needed, you can delete plants or care logs by following these steps:

1. Navigate to the respective page (plants or care logs).
2. Find the plant or care log you want to delete.
3. Click on the "Delete" button next to the item.

Happy Plant Parenting! 🌱

---