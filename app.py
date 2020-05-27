import numpy as np
from PIL import Image
import base64
import re
#import cStringIO
from io import StringIO 
from flask import Flask
from flask_mysqldb import MySQL
import os
from flask import render_template, request,redirect, session, flash, url_for, send_from_directory
import re
from flask_cors import CORS
#request.form['categoria']
from flask import jsonify
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from cv2 import cv2

app = Flask(__name__)
cors = CORS(app)


@app.route('/',methods=['GET'])
def index():

    return render_template('index.html')


@app.route('/upload', methods=['POST']) 
def upload_base64_file(): 
    """ 
        Upload image with base64 format and get car make model and year 
        response 
    """

    data = request.values['imageBase64']



    if data is None:

        print("No valid request body, json missing!")
        return jsonify({'error': 'No valid request body, json missing!'})

    else:


        img_data = data

        img_data = re.sub('^data:image/.+;base64,', '', data)

        # this method convert and save the base64 string to image
        convert_and_save(img_data)


    loaded_model = tf.keras.models.load_model("model/model.h5")
    
    img = cv2.imread('tmp/imageToSave.png', cv2.IMREAD_UNCHANGED)
   
    img_gray = img[:, :, 3]

    resized = cv2.resize(img_gray,(28, 28), interpolation = cv2.INTER_AREA)

    resized =resized/255

    predicted = np.argmax(loaded_model.predict(np.array([resized])))

    return jsonify({'predict':int(predicted)})


def convert_and_save(b64_string):


    with open("tmp/imageToSave.png", "wb") as fh:
        fh.write(base64.decodebytes(bytes(b64_string, 'utf-8')))


if __name__ =='__main__':

    app.run(debug=True,port=3000)
