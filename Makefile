MAKE = make

help:
	@echo "Please use \`make <target>' where <target> is one or more of"
	@echo "  install         install flask and react dependencies"
	@echo "  run server      run flask server"
	@echo "  run             run react app (server needs to be sterted first)"

install:
	cd flask-server;
	python -m venv venv;
	venv/bin/pip install -r requirements.txt
