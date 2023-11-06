# Info Bencana BackEnd


## Installation

Install info bencana backend with npm

```bash
  git clone https://github.com/infobencana/backend.git
  cd backend
  npm install
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`

`MONGO_CONNECTION_STRING`

`PORT`

`TOKEN_KEY`

`GCP_PROJECT_ID`

`GCP_BUCKET_NAME`

`GCP_PRIVATE_KEY`

`GCP_CLIENT_EMAIL`

Run project

```bash
  npm run start
```

## Database Schema

`User`

- email: String
- full_name : String
- password : String
- role : Enum [user, admin]
- gender : String
- phone_number : String
- photo_profile : String
- create_at : Date

`ReqMissingPeople`

- req_by: ObjectId
- name: String
- bencana_id: ObjectId
- bencana_name: String
- missing_people_id: ObjectId
- gender: String
- status: Boolean
- weight: Number
- height: Number
- age: Number
- address: String
- last_seen: String
- timestamp: Date
- req_status: String

`Disaster`
- name: String
- detail: Object
  - type: String
  - status: String
  - date: Date
  - description: String
- place: String
- victim: Number
- latitude: Number
- longitude: Number
- donations: [Donation]
- picture: String
- people_gone: [PeopleGone]
- discuss: [Discuss]
- user_detail: ObjectId
- timestamp: Date

`Donation`

- type: Number
- platform_name: String
- source: String
- holder_name: String

`PeopleGone`

- status: Boolean
- name: String
- gender: String
- weight: Number
- height: Number
- age: Number
- address: String
- last_seen: String
- timestamp: Date

`Discuss`

- userId: ObjectId
- comment: String
- timestamp: Date


## API Reference

#### Register

```http
  POST /signup
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `full_name` `email` `password` | `false` | - |

#### Login

```http
  POST /login
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `email` `password` | `false` | - |

#### Profile

```http
  GET /profile
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| - | `true` | - |

#### Update Profile

```http
  PUT /profile
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `full_name` `phone_number` `gender` `photo_profile` | `true` | - |

#### Upload Photo Profile

```http
  POST /profile/upload_photo
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `photo_profile` | `true` | - |

#### List Disaster

```http
  GET /disaster
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| - | `false` | `search` `sort` `status` |

#### Add Disaster

```http
  POST /disaster
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `name` `victim` `latitude` `longitude` `place` `donations` `picture` `detail` `people_gone` | `true` | - |

#### Update Disaster

```http
  PUT /disaster/{id}
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `name` `victim` `latitude` `longitude` `place` `donations` `picture` `detail` `people_gone` | `true` | - |

#### Delete Disaster

```http
  DELETE /disaster/{id_disaster}
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| - | `true` | - |

#### Disaster by Id

```http
  GET /disaster/{id_disaster}
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| - | `true` | - |

#### Add New Missing People

```http
  POST /disaster/{id_disaster}/people_gone
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `name` `status` `gender` `weight` `height` `age` `address` `last_seen` | `true` | - |

#### Delete Missing People

```http
  DELETE /disaster/{id_disaster}/people_gone/{id_people_gone}
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| - | `true` | - |

#### Weekly Report

```http
  GET /disaster/weekly_report
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| - | `true` | - |

#### Add Discuss

```http
  POST /disaster/{id_disaster}/discuss
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `comment` | `true` | - |

#### Show Discuss

```http
  GET /disaster/{id_disaster}/discuss
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| - | `true` | - |

#### Add Image

```http
  POST /disaster/image
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| `picture` | `true` | - |

#### Show Location

```http
  GET /disaster/lat_long
```

| Body | Need token | Query |
| :-------- | :--------- | :---------- |
| - | `false` | - |
