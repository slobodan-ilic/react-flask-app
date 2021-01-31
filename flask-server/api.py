"""Home of the Flask API application."""

from flask import Flask
from flask import request as req

from services.prorator import Prorator

app = Flask(__name__)


@app.route("/prorate", methods=["POST"])
def prorate():
    return Prorator(req.json).output
