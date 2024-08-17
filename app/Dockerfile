# Use an official Python runtime as a parent image
FROM python:3.9.12

# Set build arguments
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

# Set environment variables
ENV FLASK_APP=${FLASK_APP}
ENV FLASK_ENV=${FLASK_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV SCHEMA=${SCHEMA}
ENV SECRET_KEY=${SECRET_KEY}

# Set the working directory
WORKDIR /sushiya-restaurant

# Copy requirements and install
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2-binary

# Copy the rest of the application
COPY . .

# Copy the React build files
COPY react-app/build /sushiya-restaurant/react-app/build

# Explicitly copy the menu.csv file from the root directory
COPY menu.csv /sushiya-restaurant/menu.csv

# Expose port 5000 for the Flask app
EXPOSE 5000

# Run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
