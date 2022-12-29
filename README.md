# Valere Movies app

## Running the project locally

In the project directory, you can run:

### `npm start`

### before running "npm start", make sure to install the required node modules by running "npm install"

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Running the project locally using Docker

After opening Docker Desktop, in the project directory, you can:

# Build the Docker image for the current folder

# and tag it with `dockerized-react` by running:

docker build . -t dockerized-react

# Run the image in detached mode

# and map port 3000 inside the container with 3000 on current host by running:

docker run -p 3000:3000 -d dockerized-react

# open the application by visiting

http://localhost:3000/ in your browser
