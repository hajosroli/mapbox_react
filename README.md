# Mapbox Map Application

## Description
This is a web application built using Mapbox GL JS that displays a map centered around Veszprém city as the default view. Users can place markers on the map, plan routes between markers, and more.

## Features
- Display a map centered around Veszprém city.
- Add markers to the map (limit is set to 6 by default)
- Plan routes between markers.
- Select route mode(driving, cycling, walking)
- Show route distance, and time.
- Show route endpoints(start, via, end (tooltips on hover))
- Search for locations and add markers using address or location search with autofill suggestions.
- Customize route appearance.

## Technologies Used
- [Mapbox GL JS]: A JavaScript library for interactive, customizable maps.
- [Mapbox Directions API]: Used for route planning.
- [Font Awesome]: Used for icons.
- [React Bootstrap]: Bootstrap components for React.

## Running the Application

Follow these instructions to set up the MapBox Map Application on your local machine.
You can run the application using either `npm` or Docker Compose.

### Option 1: Using npm

```bash
# Clone the repository to your local system.
$ git clone https://github.com/hajosroli/mapbox_react.git

# Open the solution
# Navigate to the project directory.
$ cd mapbox_gl_js_react

# Make a copy of the .env_sample_token file
In the project directory find .env_sample_token, rename it to .env and add your access token if you have or you can get one from here https://www.mapbox.com/.

# Install project dependencies using [package manager]:
$ npm install

#  Start the development server:
$ npm start

# Open your web browser and go to http://localhost:3000 to explore the MapBox Map App.
```

### Option 2: Using Docker Compose

```bash
#
# Clone the repository to your local system.
$ git clone https://github.com/hajosroli/mapbox_react.git

# Open the solution
# Navigate to the project directory.
$ cd mapbox_react

# Make a copy of the .env_public_sample_docker file
In the project root folder find .env_public_sample_docker, rename it to .env and add your access token if you have or you can get one from here https://www.mapbox.com/.

# Build the Docker image and start the container using the following command:
$ docker compose up

# Open your web browser and go to http://localhost:3000 to explore the MapBox Map App.
```
