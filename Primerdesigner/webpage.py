import sequencemanipulation as sm
from flask import Flask, request, render_template



app = Flask(__name__)

@app.route("/")
def helloworld():
    return "<p> Hello world </p>"
