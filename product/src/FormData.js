import React, { useEffect, useState } from 'react';

function FormData() {
  const [country, setCountryName] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: 'Female',
    skills: [],
    selectedCountry: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://api.first.org/data/v1/countries');
        const response = await res.json();
        const countryList = Object.values(response.data).map(item => item.country).sort();
        setCountryName(countryList);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter(skill => skill !== value)
      }));
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, gender: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage('✅ Form submitted successfully!');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          gender: 'Female',
          skills: [],
          selectedCountry: ''
        });

      } else {
        setSuccessMessage('❌ Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setSuccessMessage('❌ Error occurred while submitting the form.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
        </div>

        <label>Gender:</label>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
          <label className="form-check-label">Female</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} />
          <label className="form-check-label">Other</label>
        </div>

        <label>Skill:</label>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="React" checked={formData.skills.includes("React")} onChange={handleChange} />
          <label className="form-check-label">React</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="Node.js" checked={formData.skills.includes("Node.js")} onChange={handleChange} />
          <label className="form-check-label">Node.js</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="MongoDB" checked={formData.skills.includes("MongoDB")} onChange={handleChange} />
          <label className="form-check-label">MongoDB</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="Express" checked={formData.skills.includes("Express")} onChange={handleChange} />
          <label className="form-check-label">Express</label>
        </div>

        <div className="form-group">
          <label>Select Country</label>
          <select className="form-control" name="selectedCountry" value={formData.selectedCountry} onChange={handleChange}>
            <option value="">-- Select Country --</option>
            {country.map((countryName, index) => (
              <option key={index} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {successMessage && (
        <div className="alert alert-info mt-3">{successMessage}</div>
      )}
    </>
  );
}

export default FormData;




