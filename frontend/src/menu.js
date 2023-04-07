import React, { useState } from "react";
import axios from "axios";
const options = [
  { type: "sex", values: [1, 2] },

  {
    type: "highest_qualification",
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },

  { type: "rural", values: [1, 2] },

  { type: "disability_status", values: [0, 1, 2, 3, 4, 5, 6, 7, 8] },

  { type: "is_water_filter", values: [1, 2] },

  { type: "chew", values: [0, 1, 2, 3, 4, 5, 6, 7, 8] },

  { type: "smoke", values: [0, 1, 2, 3, 4, 5] },

  { type: "alcohol", values: [0, 1, 2, 3, 4, 5] },

  {
    type: "treatment_status",
    values: [
      "0-10",
      "11-20",
      "21-30",
      "31-40",
      "41-50",
      "51-60",
      "61-70",
      "71-80",
      "81-90",
      "91-100",
    ],
  },
];

function Menu() {
  const [formData, setFormData] = useState({});
  var [Predictedvalue, setPredictedValue] = useState("NA");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    // Send formData to Flask server using fetch or Axios
    axios
      .post("http://localhost:5001/predict", JSON.stringify(formData))
      .then((response) => {
        Predictedvalue = response.data[0][0];
        console.log(Predictedvalue);
        setPredictedValue(Predictedvalue);
        console.log(response.status, response.data);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-row ">
          {options.map((data) => (
            <label className=" flex flex-col justify-center content-center m-2">
              <div className="font-bold">{data.type}</div>
              <select
                required
                name={data.type}
                onChange={handleInputChange}
                className="bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option disabled selected>
                  --Select an option--
                </option>
                {data.values.map((child) => (
                  <option value={child}>{child}</option>
                ))}
              </select>
            </label>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded"
          >
            Submit
          </button>
        </form>
        <h1 className="text-6xl text-center mt-40">Predicted value is</h1>
        <h1 className="text-6xl text-center mt-40">{Predictedvalue}</h1>
        
      </div>
    </div>
  );
}

export default Menu;
