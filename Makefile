MAKE = make

help:
	@echo "Please use \`make <target>' where <target> is one or more of"
	@echo "  install         install flask and react dependencies"
	@echo "  run server      run flask server"
	@echo "  run             run react app (server needs to be sterted first)"

install:
	@echo "Installing python virtual environment with Flask dependencies..."
	python3 -m venv flask-server/venv;
	flask-server/venv/bin/pip install -r flask-server/requirements.txt;
	@echo "Installing required react dependencies..."
	npm install

run-server:
	@echo "Starting Flask server with Prorator API..."
	cd flask-server && venv/bin/flask run --no-debugger

run:
	@echo "Starting React Prorator app..."
	yarn start

test:
	@echo "Running backend tests..."
	cd flask-server && venv/bin/pytest
