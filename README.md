# Ad Insights Explorer

## Description

The goal of this project is to create a dashboard that analyses post from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts).

The app consists of two main components: 

- Flask API used to process the posts, detected anomalies and offer a summary about the posts

- React application that displays a dashboard including the posts, reasons for flaging, a leaderboard showing the users with most unique titles and a cloud tag representing all the words used in the posts' titles.


## Setup Instructions

### 1. Clone the repository

```
$ git clone git@github.com:TudorMaxim/ad-insights-explorer.git

$ cd ad-insights-explorer
```

### 2. Install dependencies for Flask app

```
$ cd backend
$ python -m venv venv
$ source .venv/bin/activate ( or .\venv\Scripts\activate on Windows)
$ pip install -r requirements.txt
```

### 3. Run the Flask app.

First, create a `.env` file in the `backend` folder for environment variables. It could look like this:

```
POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
POSTS_DEFAULT_PAGE_SIZE = "10"
POST_MIN_TITLE_LEGTH = "15"
USER_POSTS_SIMILAR_TITLE_THRESHOLD = "2"
```

Only `POSTS_URL` needs to be set, the other variables have default values.

Then, simply run the app using `$ python run.py`.

### 4. Run the React app

First, in a separate terminal got to `frontend` folder and install the dependencies.

```
$ cd ../frontend
$ yarn install
```
Then, create a `.env` file and set the variable `REACT_APP_API_URL=http://localhost:5000/api`

Finally, you can run it using `yarn start`.
