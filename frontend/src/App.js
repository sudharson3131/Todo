import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [entervalue, setValue] = useState("");
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/fruitlist")
      .then((response) => {
        setFruits(response.data);
      });
  }, []);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function addValue() {
    axios.post("http://localhost:5001/addfruit", { newfruit: entervalue });
    setFruits([...fruits, { name: entervalue }]);
    setValue("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Fruit Manager 🍎
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <input
            type="text"
            value={entervalue}
            onChange={handleChange}
            placeholder="Enter a fruit"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
          <button
            onClick={addValue}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Add Fruit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fruits.map((item, index) => (
            <div
              key={index}
              className="bg-blue-100 text-blue-800 px-4 py-3 rounded-xl shadow-sm text-center text-lg font-medium"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
