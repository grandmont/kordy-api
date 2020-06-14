<div align="center">
<br/>
<br/>
<h2><strong>Kordy</strong></h2>
<p>A random and <strong>amazing</strong> way to make new friends!</p>
<br/>
      <img src="https://img.shields.io/github/workflow/status/grandmont/kordy-api/CI"/>
      <img src="https://img.shields.io/github/issues/grandmont/kordy-api"/>
      <img src="https://img.shields.io/github/commit-activity/m/grandmont/kordy-api"/>
      <img src="https://img.shields.io/github/stars/grandmont/kordy-api?style=social"/>
<br/>
</div>

## What is Kordy?

**Kordy** is an open source social media application that allows you to meet random strangers!

## Table of contents

-   [Getting started:](#getting-started)
    -   [Starting the project](#starting-the-project)
    -   [Configuring the environment](#configuring-the-environment)
    -   [Using Docker](#using-docker)
    -   [LocalStack](#localstack)
-   [Infrastructure](#infrastructure)
    -   [Services](#services)
    -   [Deployment](#deployment)
-   [Project structure](#project-structure)
-   [Documentation](#documentation)
-   [Contributors](#contributors)

## Getting started

This repository contains the **Kordy** API. Use **git clone** to clone the project in your directory.

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

### Configuring the environment

After installing the dependencies, create a **.env.development** file in the root directory of the project with the following structure:

```bash
# PostgreSQL Database variables

DB_HOST=        # The DB host address (e.g. localhost).
DB_USER=        # The DB username (e.g. postgres).
DB_PASSWORD=    # The DB passowrd (e.g. postgres).
DB_DATABASE=    # The DB name (e.g. kordy).
DB_PORT=        # The DB port (e.g. 5432).

# JWT configuration

JWT_SECRET=     # The authentication secret key.

# AWS credentials

AWS_ACCESS_KEY_ID=      # IAM access key
AWS_SECRET_ACCESS_KEY=  # IAM secret

# AWS resources

AWS_BUCKET_NAME=    # The AWS S3 Bucket
AWS_S3_ENDPOINT=    # The AWS S3 endpoint (e.g. http://localhost:4566)
```

> **Note:** The AWS credentials should have access to the cloud computing services listed in the [infrastructure](#infrastructure) section.

> **Note:** The environment default value is **development**. When deploying to a production environment you need to create a **.env.production** file.
> For further information on deploying the application, see [deployment](#deployment) section.

Now that everything is set up, run the command:

```ssh
yarn start
```

> **Note:** This will start the server on http://localhost:3001.

### Using Docker

To run this project with Docker, run the command:

```ssh
docker-compose up --build -d
```

> **Note:** Make sure to run LocalStack first. For further information, see [LocalStack](#localstack) section below.

### LocalStack

The **Kordy** API depends on some cloud computing services to run (e.g. AWS S3). To avoid using real services in development environment, we recommend you to use [LocalStack](https://localstack.cloud/).

For further information on configuring LocalStack and the required services to run this project, see [localstack.md](docs/localstack.md).

## Infrastructure

This **Kordy** API is hosted in AWS. The services used by the project are listed below:

### Services

-   [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
-   [RDS](https://aws.amazon.com/rds/)
-   [S3](https://aws.amazon.com/s3/)
-   [CodePipeline](https://aws.amazon.com/codepipeline/)

### Deployment

_Coming soon_...

## Project structure

The project has the following structure:

```bash
    .
    ├── __tests__           # Continuous Integration tests
    ├── database            # Sequelize migrations and seeders
    ├── docs                # Project documentation
    ├── src                 # Project source
    │   ├── config          # Environment and database configuration
    │   ├── controllers     # App controllers
    │   ├── middlewares     # Authentication middlewares
    │   ├── models          # Sequelize models
    │   ├── services        # App services
    │   └── ...
    ├── index.ts            # Main development entry file
    └── ...
```

## Documentation

Here's a list with relevant documentation links to the **Kordy** API:

-   [API Documentation](docs/api.md)
-   [Database diagram](docs/dbdiagram.png)
-   [LocalStack](docs/localstack.md)

## Contributors

-   **Gabriel Pereira** - [gabepereira](https://github.com/gabepereira)
-   **Marcelo Mena** - [arcmena](https://github.com/arcmena)
