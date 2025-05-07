import { useState } from "react";
import axios from "axios";

interface PatientFormData {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  address: string;
  mobileNo: string;
  dateOfBirth: string;
  bloodGroup: string;
  interestedInBloodDonate: boolean;
}

const PatientForm = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
    address: "",
    mobileNo: "",
    dateOfBirth: "",
    bloodGroup: "",
    interestedInBloodDonate: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:6969/api/patient/register", formData);
      alert("Patient registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Patient registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center">Patient Registration</h2>

      {(Object.keys(formData) as (keyof PatientFormData)[]).map((field) =>
        field === "interestedInBloodDonate" ? (
          <label key={field} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field}
              checked={formData[field]}
              onChange={handleChange}
            />
            Interested in Blood Donation
          </label>
        ) : (
          <input
            key={field}
            type={
              field === "email" ? "email" :
              field === "password" ? "password" :
              field === "dateOfBirth" ? "date" :
              field === "mobileNo" ? "tel" :
              "text"
            }
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={formData[field] as string}
            onChange={handleChange}
            required
            className="input-field"
          />
        )
      )}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
    </form>
  );
};

export default PatientForm;
