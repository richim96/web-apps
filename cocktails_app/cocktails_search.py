"""
This simple app accesses the Cocktail Database API and allows
you to look up your favourite drinks.

:author: riccardo mei
:encoding: utf-8
"""
import flask
import flask_cors

cocktail_app = flask.Flask(__name__)
flask_cors.CORS(app=cocktail_app)

@cocktail_app.route('/')
def home():
    return flask.render_template("cocktails.html")


@cocktail_app.route('/favicon.ico')
def fav_icon():
    return flask.send_file("static/icon.ico")


if __name__ == "__main__":
    cocktail_app.run(debug=True)
