# Setting up LocalStack

## Running with Docker

To run LocalStack with all the required services to run this project, run the command below in the root directory of the application:

```ssh
docker-compose -f ./localstack.yml up -d
```

This command will pull the LocalStack image from Docker Hub and run a container that will bind the services to http://localhost:4566.

## Configuring the services

Here's a step by step to configure each required service:

### AWS Command Line Interface

To configure the services, you will need to have the AWS CLI installed.

You can download it in the official AWS website on https://aws.amazon.com/cli.

### S3

After installing the AWS CLI, you can run the command below to create a new Bucket in the LocalStack endpoint that will be used by our application.

```bash
aws --endpoint-url http://localhost:4566 s3 mb s3://AWS_BUCKET_NAME
```

Change **AWS_BUCKET_NAME** with the actual Bucket name that you want.

> **Note:** The **AWS_BUCKET_NAME** must also be the environment variable in your **.env.development** file. For further information about configuring environment variables, see [Environment](/README.md#environment) section.

To list all the files from the Bucket:

```bash
aws --endpoint-url http://localhost:4566 s3 ls s3://AWS_BUCKET_NAME --recursive
```

## Authors

-   **Gabriel Pereira** - [gabepereira](https://github.com/gabepereira)
