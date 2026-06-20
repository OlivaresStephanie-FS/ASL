# Space Tracker App

A RESTful Space Object Library API built with Express.js, MySQL, Docker, and Sequelize ORM for the Advanced Server-Side Languages (WDV442) course.

## Overview

This application manages three types of celestial objects:

- Galaxies
- Stars
- Planets

The API demonstrates full CRUD functionality and Sequelize ORM relationships, including one-to-many and many-to-many associations.

## Technologies Used

- Node.js
- Express.js
- MySQL 8
- Sequelize ORM
- Docker
- Docker Compose
- Nodemon

## Data Models

### Galaxy

| Field       | Type    |
| ----------- | ------- |
| name        | String  |
| size        | Integer |
| description | Text    |

Relationships:

- Has Many Stars

### Star

| Field       | Type    |
| ----------- | ------- |
| name        | String  |
| size        | Integer |
| description | Text    |
| GalaxyId    | Integer |

Relationships:

- Belongs To Galaxy
- Belongs To Many Planets

### Planet

| Field       | Type    |
| ----------- | ------- |
| name        | String  |
| size        | Integer |
| description | Text    |

Relationships:

- Belongs To Many Stars

### StarsPlanets

Join table used to support the many-to-many relationship between Stars and Planets.

| Field    | Type    |
| -------- | ------- |
| StarId   | Integer |
| PlanetId | Integer |

## Associations

```javascript
Galaxy.hasMany(Star);
Star.belongsTo(Galaxy);

Star.belongsToMany(Planet, {
	through: StarsPlanets,
});

Planet.belongsToMany(Star, {
	through: StarsPlanets,
});
```

## API Endpoints

### Galaxies

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | /galaxies     | Get all galaxies    |
| GET    | /galaxies/:id | Get a single galaxy |
| POST   | /galaxies     | Create a galaxy     |
| PUT    | /galaxies/:id | Update a galaxy     |
| DELETE | /galaxies/:id | Delete a galaxy     |

### Stars

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /stars     | Get all stars     |
| GET    | /stars/:id | Get a single star |
| POST   | /stars     | Create a star     |
| PUT    | /stars/:id | Update a star     |
| DELETE | /stars/:id | Delete a star     |

### Planets

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | /planets     | Get all planets     |
| GET    | /planets/:id | Get a single planet |
| POST   | /planets     | Create a planet     |
| PUT    | /planets/:id | Update a planet     |
| DELETE | /planets/:id | Delete a planet     |

## Running the Application

### Start Containers

```bash
docker compose up -d
```

### Access the Node Container

```bash
docker exec -it assignment-wdv442-node-1 sh
```

### Run the Application

```bash
npm run watch
```

### Verify API

```bash
curl http://localhost:3000/
```

Expected response:

```text
Welcome to Star Tracker Library
```

## Example cURL Requests

### Create Galaxy

```bash
curl -X POST \
-H "Content-Type: application/json" \
--data '{"name":"Milky Way","size":100000,"description":"The galaxy that contains our solar system."}' \
http://localhost:3000/galaxies
```

### Create Star

```bash
curl -X POST \
-H "Content-Type: application/json" \
--data '{"name":"Sun","size":1392000,"description":"The star at the center of our solar system.","GalaxyId":1}' \
http://localhost:3000/stars
```

### Create Planet

```bash
curl -X POST \
-H "Content-Type: application/json" \
--data '{"name":"Earth","size":12742,"description":"Third planet from the Sun."}' \
http://localhost:3000/planets
```

## Assignment Requirements Completed

- Full RESTful API implementation
- Sequelize ORM integration
- Galaxy model
- Star model
- Planet model
- StarsPlanets join table
- One-to-Many relationship (Galaxy → Stars)
- Many-to-Many relationship (Stars ↔ Planets)
- Full CRUD operations for all resources
- cURL testing and validation

## Author

Stephanie Olivares
Advanced Server-Side Languages (WDV442)
Full Sail University
