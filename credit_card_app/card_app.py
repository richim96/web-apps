"""
:author: riccardo mei
:encoding: utf-8
"""
import flask
import flask_cors

card_app = flask.Flask(__name__)
flask_cors.CORS(app=card_app)


@card_app.route('/favicon.ico')
def fav_icon():
    return flask.send_file("static/card.ico")


@card_app.route('/')
def home():
    return flask.render_template("card_checker.html")


if __name__ == "__main__":
    card_app.run(debug=True)
