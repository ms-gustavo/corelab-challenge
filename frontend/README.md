# To-Do List for CoreLab Challenge Front End Documentation

Front-End for the challenge proposed by Corelab as a requirement for a Junior Developer position

## Author

- [@msgustavo](https://github.com/ms-gustavo)

## Technologies used

**UI Library**: React (v18.2.0)

**State Management**: Formik (v2.4.5)

**Validation**: Yup (v1.3.3)

**Styling**: SASS (v1.70.0)

**HTTP Client**: Axios (v1.6.5)

**TypeScript**: (v4.9.5)

**Testing**: Jest, @testing-library/react

## Base URL

`http://localhost:3001/`

## Setup and Local Run

1. Clone the repository

```bash
git@github.com:ms-gustavo/corelab-challenge.git
```

2. Navigate to the project directory

```bash
cd corelab-challenge
```

3. Switch to frontend branch

```bash
git checkout frontend
```

4. Run docker command

```bash
docker-compose up
```

## Running the tests

To run the tests, run the following command

```bash
docker exec -it frontend-appfrontend-1 bash
```

and then run the following command

```bash
npm test
```
