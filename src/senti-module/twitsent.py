import numpy as np
# import nltk
# import pprint
import tweepy as tw
import pandas as pd
import csv
import time

from sklearn.externals import joblib

def authorizer():
    creds = """805933436833845248-4AlcoUTzTrdyPBxrvnJ6EujxrVXXUdT
MLBm2875Oxq0iyZrDXhbF4yQmebOEiycjBq5I79RQR949
sciau9rC653KOWXpPzD3lzprR
msqOteNgwp3di2Xdr3AAjX6uNghHRtqBCBVpbeiizRlBUjKah1"""
    tokens = creds.split('\n')
    auth = tw.OAuthHandler(tokens[2], tokens[3])
    auth.set_access_token(tokens[0], tokens[1])

    api = tw.API(auth)
    return api

def tweets_getter(player_name, date):
    # string - player name - "Jaylen Brown"
    # string - date - "yyyy-mm-dd" - "2018-12-21" - The date for 
    # which you want to retrieve tweets
    # RETURNS: a float number in range [0,100]
    
    one_day = pd.Timedelta(days=1)
    tomorrow = (pd.to_datetime(date, format='%Y-%m-%d') + one_day).strftime('%Y-%m-%d')
    
    api = authorizer()
    query_mid = ' -filter:retweets -filter:links until:'
    query = player_name + query_mid + tomorrow

    temp = [[pd.to_datetime(date, format='%Y-%m-%d'), 'Amazing']]
    num_tweets = 200
    for tweet in tw.Cursor(api.search, q=query, tweet_mode='extended').items(num_tweets):
        if tweet.retweet_count < 1:
            continue
        temp.append([tweet.created_at, tweet.full_text])
    db = pd.DataFrame(temp)
    db = db[db[0] >= date]
    
    filename = 'player-sentiment-model.pkl'
    with open(filename, 'rb') as fin:
        senti_model = joblib.load(fin)
    
    probs = (senti_model.predict_proba(db[1])*100).astype(int)
    pos_index = np.argmax(probs[0])
    scores = probs[:,pos_index]
    avg = np.mean(scores)
    
    return avg

def process_csv():
    new_rows = []
    with open('../basic-last7.csv', 'rt') as f:
        reader = csv.reader(f) # pass the file to our csv reader
        i = 0
        for row in reader:     # iterate over the rows in the file
            if (i == 0):
                row.append('twt')
            elif(i >= 13):
                sent = tweets_getter(row[0], row[3])
                print (row[0])
                print (row[3])
                print (sent)
                row.append(sent)
            new_row = row
            i += 1
            new_rows.append(new_row) # add the modified rows

process_csv()