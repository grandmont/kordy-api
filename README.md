<div align="center">
<br/>
<br/>
<h2><strong>Kordy</strong></h2>
<p>A random and <strong>amazing</strong> way to make new friends!</p>
<br/>
      <img src="https://img.shields.io/github/workflow/status/grandmont/kordy/CI"/>
      <img src="https://img.shields.io/github/issues/grandmont/kordy"/>
      <img src="https://img.shields.io/github/commit-activity/w/grandmont/kordy"/>
      <img src="https://img.shields.io/github/stars/grandmont/kordy?style=social"/>
<br/>
</div>

## What is Kordy?

**Kordy** is a social media application that allows you to meet random strangers and start friendships (_or not_) with them.

## Table of contents

**Table of Contents**

-   [Getting started:](#gettingstarted)
    -   [Starting the project](#start-local)
    -   [Using Docker](#docker)
-   [Project structure](#project-structure)
-   [Deployment](#deploy)
-   [Contributors](#contributors)

## Getting started

This repository contains the **Kordy** application API. Use **git clone** to download the project.

```ssh
git clone https://github.com/grandmont/kordy.git
```

### Starting the project

In order to run this project you need to have installed in your machine:

-   Node 12+
-   PostgreSQL 10+

Install the dependencies running the command:

```ssh
yarn install
```

After installing the dependencies, create a **.env.development** file in the root directory of the project with the following structure:

```bash
# PostgreSQL Database variables

DB_HOST=        # The DB host address. e.g.: localhost
DB_USER=        # The DB username. e.g.: postgres
DB_PASSWORD=    # The DB passowrd. e.g.: postgres
DB_DATABASE=    # The DB name. e.g.: kordy
DB_PORT=        # The DB port. e.g.: 5432

# JWT configuration

JWT_SECRET=     # The authentication secret key.
```

> **Note:** the environment default value is **development**. When deploying to a production environment you need to create a **.env.production** file.

Now that everything is set up, run the command:

```ssh
yarn start
```

> **Note:** This will start the server on http://localhost:3001.

### Using Docker

To run this project with Docker, run the command:

```ssh
docker-compose up
```

## Project structure

## Deployment

## Contributors

-   **Gabriel Pereira** - [gabepereira](https://github.com/gabepereira)
-   **Marcelo Mena** - [arcmena](https://github.com/arcmena)
