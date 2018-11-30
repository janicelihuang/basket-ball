twitsent.py
This file contains two functions - one to authorize the twitter api
another function that takes in player name, and date, and returns an aggregated sentiment score for that player on that day.

player-sentiment-model.pkl
This is a scikit learn model that is loaded by twitsent.py and used to generate sentiment score.

twitsent.py requires the following libraries - they can all be installed with "pip install numpy", etc.
numpy
tweepy
pandas