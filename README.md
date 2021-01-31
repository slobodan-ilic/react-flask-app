# Investment helper application - Prorator (Flask-React)


## Intro

This project represents the solution for the take-home excercise
provided by *AngelList*. It consists of a bakend app implemented in Flask,
and a frontend app implemented in React.

The backend part implements an algorithm for calculating the "prorated"
investment amounts for the investors. It is used to help investors distribute
the desired investments more equaly and fairly.

The frontend part is used to create the appropriate payload to send to the
algorithm on the backend. It is a minimal react application with very little styling.
The users need to add the total allocation amount, and an optional number of investors.
The investors can be added manually with their "name, requested amount, average amount"
values. Once added, by clicking the "Prorate" button, the relevant payload is formed
and sent to the backend for calculation. On receiving the response from the server
the corrected (prorated) amounts are displayed.

In order to check out the functionality, please complete all the steps below,
in the respective sequence: Clone -> Install -> Start Server -> Start app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Cloning the code to a local checkout

First clone the repository locally, in order to be able to run the app. Create a dedicated
directory for this demo, and in it run:

### `git clone git@github.com:slobodan-ilic/react-flask-app.git`

this will create a local directory called `react-flask-app`. You need to to `cd react-flask-app`
to continue this demo.

## Installin the required dependencies

Makefile is used to make all the commands more uniform. You first need to
install all the requirements to be able to run server and client. Navigate to
the project directory and run:

### `make install`

This will first install python virtual environment into a subfolder (flask-server),
with all the dependencies fromt he `flask-server/requirements.txt` file. Then,
it will install all the react dependencies from the `package.json`.

## Starting the Flask server

Please check the previous step if you haven't installed all the dependencies.
The Flask server needs to be started before the app can work. To do so, navigate
to the project directory and run:

### `make run-server`

This will run the flask-server on [http://localhost:5000](http://localhost:5000).
This is a blocking command, and will continue to display requests made to the server,
making your terminal window non-usable for further commands. So you might need to open
another one, in order to also run the app (following step).

## Starting the React app

Please check the previous step if you haven't started the server.
After starting the server, we need to start the app. You might need to open an
additional terminal window, since the above command (starting server) is blocking.
From the project directory, run:

### `make start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
All requests are forwarded to the flask server on port 5000, through proxy.

## Running the backend tests

### `make test`
