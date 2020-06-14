# API Documentation

**Kordy** API documentation.

## Table of contents

-   [Introduction](#introduction)
-   [User](#user)
    -   [/createUser](#create-user)
    -   [/auth](#authenticate)
    -   [/refreshToken](#refresh-token)

## Introduction

The endpoints to the REST API are described with the following format:

**Description**:

-   **URL**: The endpoint to request.
-   **Method**: The HTTP method to be used. (e.g. GET, POST, etc.)
-   **Permission**: The access permission to make the request. (e.g. Public, Authenticated, Admin, etc.)

**Request**:

-   An example of request to the endpoint (Javascript syntax).

**Response**:

-   An example of what is returned from the request (JSON syntax).

## User

---

### **Create user**

Creates a new user.

```
URL: /createUser
Method: POST
Permission: Public
```

**Request:**

Headers:

```js
{
    "Content-Type": "application/json"
}
```

Body:

```js
{
    kordy: "example",
    email: "example@kordy.com",
    password: "example",
    name: "Kordy Example"
}
```

**Response:**

```
Status: 201 Created
```

```json
{
    "id": 1,
    "kordy": "example",
    "email": "example@kordy.com",
    "password": "$2a$08$wgUYSkEyl5iZ7CsErwzTbu4sLgawRob/zfZoNsN3k5sfb/5kK6aMK",
    "name": "Kordy Example",
    "updatedAt": "2020-06-14T11:23:17.726Z",
    "createdAt": "2020-06-14T11:23:17.726Z"
}
```

---

### **Authenticate**

Returns a new valid token if requested with valid credentials.

```
URL: /auth
Method: POST
Permission: Public
```

**Request:**

Headers:

```js
{
    "Content-Type": "application/json"
}
```

Body:

```js
{
	email: "example@kordy.com",
	password: "example"
}
```

**Response:**

```
Status: 200 OK
```

```json
{
    "token": "[TOKEN]",
    "user": {
        "id": 1,
        "kordy": "example"
    }
}
```

---

### **Refresh token**

Refreshs the token if requested with a valid token.

```
URL: /refreshToken
Method: GET
Permission: Public
```

**Request:**

Headers:

```js
{
    Authorization: 'Bearer [TOKEN]';
}
```

**Response:**

```
Status: 200 OK
```

```json
{
    "token": "[TOKEN]",
    "user": {
        "id": 1,
        "kordy": "example"
    }
}
```
