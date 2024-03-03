import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    maritalStatus: '',
    seenTherapist: '',
    takingMedication: '',
    medications: [''],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleMedicationChange = (index, value) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index] = value;
    setFormData({ ...formData, medications: updatedMedications });
  };
  
  const handleAddMedication = () => {
    setFormData({ ...formData, medications: [...formData.medications, ''] });
  };

  return (
    <div className="App">
      <h1>Survey Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
  
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
  
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
  
        <label>
          Marital Status:
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Other">Other</option>
          </select>
        </label>
  
        <label>
          Have you ever seen a therapist for mental health issues?
          <select
            name="seenTherapist"
            value={formData.seenTherapist}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
  
        <label>
          Are you taking any medications?
          <select
            name="takingMedication"
            value={formData.takingMedication}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
  
        {formData.takingMedication === 'Yes' && (
          <div>
            <label>
              Medication Details:
              {formData.medications.map((medication, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={medication}
                    onChange={(e) => handleMedicationChange(index, e.target.value)}
                    required
                  />
                  {index === formData.medications.length - 1 && (
                    <button type="button" onClick={handleAddMedication}>
                      Add a new medication
                    </button>
                  )}
                </div>
              ))}
            </label>
          </div>
        )}
  
        <button type="submit">Submit</button>
      </form>
      {/* Render feedback component */}
    </div>
  );
}

export default App;
