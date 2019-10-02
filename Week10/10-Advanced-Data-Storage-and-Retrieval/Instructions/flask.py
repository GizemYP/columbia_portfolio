import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")
connection = engine.connect()

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB

session = Session(engine)
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end><br/>"

    )

@app.route("/api/v1.0/precipitation")
def prcp():
    """Return dates and precipitation"""

    query_prcp = session.query(Measurement.date, Measurement.prcp).all()
    dict_prcp = dict(query_prcp)
    
    return jsonify(dict_prcp)

@app.route("/api/v1.0/stations")
def station():
    """Return a list of all stations"""
    
    query_station = session.query(Station.name).all()
    
    return jsonify(query_station)

@app.route("/api/v1.0/tobs")
def temp():
    """Return a list of all dates in the last year and temeperatures"""
    
    query_date2 = dt.date(2017, 8, 23) - dt.timedelta(12*366/12)

    query_tobs = session.query(Measurement.date, Measurement.tobs).filter(Measurement.date>query_date).all()
    dict_tobs = dict(query_tobs)
    
    return jsonify(query_tobs)

if __name__ == '__main__':
    app.run(debug=True)