# Sushiya Restaurant

A japanese restaurant application where users can view the menu and order food.

## SCHEMA for the Database
![Screenshot 2024-09-18 at 5 38 48 PM](https://github.com/user-attachments/assets/29e15135-ac22-4413-b0d3-b20947fdcbc8)


## Screenshots

### Landing Page
![Screenshot 2024-09-18 at 5 42 10 PM](https://github.com/user-attachments/assets/f6620c58-a075-4879-891f-67d36c9a20b2)

### About Us Page
![Screenshot 2024-09-18 at 5 42 29 PM](https://github.com/user-attachments/assets/f91b49c6-3b4b-4b47-b5f4-843821efdec6)



## Getting started
1. Clone this repository (main branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.



# sushiya-restaurant
>>>>>>> cfa68e1af4e522e63d8520913c96b5dd19e6c29e
