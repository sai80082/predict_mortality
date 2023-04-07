from flask import Flask, request, jsonify
from keras.models import model_from_json
import numpy as np
from get_model import saved
from flask_cors import CORS
import json
import pickle


model = pickle.load(open('reg.pkl','rb'))

app = Flask(__name__)
allowed_domains = ['http://localhost:3000', 'http://localhost:8080']
cors = CORS(app, origins=allowed_domains)


@app.route("/")
def home():
    return "This is the home page"


@app.route("/predict", methods=["POST"])
def pred():

    print(request.form.keys())
    key_dict = json.loads(list(request.form.keys())[0])
    print(key_dict)
    if (key_dict == ""):
        print("empty")
    
    data1 = float(key_dict['sex'])
    data2 = float(key_dict['highest_qualification'])
    data3 = int(key_dict['rural'])
    data4 = float(key_dict['disability_status'])
    data5 = float(key_dict['is_water_filter'])
    data6 = float(key_dict['chew'])
    data7 = float(key_dict['smoke'])
    data8 = float(key_dict['alcohol'])
    data9 = float(0)

    arr = np.array(
        [[data1, data2, data3, data4, data5, data6, data7, data8, data9]])
    pred = model.predict(arr)

    pred_list = pred.tolist()
    print(pred_list)
    return jsonify(pred_list)


if __name__ == "__main__":
    app.run(debug=True,port=5001)