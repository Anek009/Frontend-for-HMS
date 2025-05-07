

// const DoctorForm = () => {
//   return (
//     <form className="space-y-4">
//       <h2 className="text-xl font-bold mb-4">Doctor Registration</h2>

//       <input type="text" name="name" placeholder="Full Name" required className="input" />
//       <input type="email" name="email" placeholder="Email" required className="input" />
//       <input type="text" name="image" placeholder="Image URL" required className="input" />
//       <input type="password" name="password" placeholder="Password" required className="input" />
//       <input type="text" name="departmentName" placeholder="Department Name" required className="input" />
//       <input type="text" name="medicalName" placeholder="Medical Name" required className="input" />
//       <input type="text" name="degree" placeholder="Degree" required className="input" />
//       <input type="text" name="designation" placeholder="Designation" required className="input" />
//       <input type="text" name="specialization" placeholder="Specialization" required className="input" />
//       <input
//         type="number"
//         name="yearOfExperience"
//         placeholder="Years of Experience"
//         min={0}
//         required
//         className="input"
//       />
//       <input
//         type="time"
//         name="startTime"
//         placeholder="Start Time"
//         required
//         className="input"
//       />
//       <input
//         type="number"
//         name="noOfDailyPatient"
//         placeholder="No. of Daily Patients"
//         min={1}
//         required
//         className="input"
//       />

//       <button type="submit" className="btn-primary">Register</button>
//     </form>
//   );
// };

// export default DoctorForm;
import { useState } from "react";
import axios from "axios";

interface DoctorFormData {
  name: string;
  email: string;
  image: string;
  password: string;
  departmentName: string;
  medicalName: string;
  degree: string;
  designation: string;
  specialization: string;
  yearOfExperience: string;
  startTime: string;
  noOfDailyPatient: string;
}

const DoctorForm = () => {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    email: "",
    image: "",
    password: "",
    departmentName: "",
    medicalName: "",
    degree: "",
    designation: "",
    specialization: "",
    yearOfExperience: "",
    startTime: "",
    noOfDailyPatient: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:6969/api/hms/register/doctor", {
        ...formData,
        yearOfExperience: parseInt(formData.yearOfExperience),
        noOfDailyPatient: parseInt(formData.noOfDailyPatient)
      });
      alert("Doctor registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Doctor registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center">Doctor Registration</h2>

      {Object.entries(formData).map(([name, value]) => (
        <input
          key={name}
          type={
            name === "email" ? "email" :
            name === "password" ? "password" :
            name === "startTime" ? "time" :
            name === "yearOfExperience" || name === "noOfDailyPatient" ? "number" :
            "text"
          }
          name={name}
          placeholder={name.replace(/([A-Z])/g, " $1")}
          value={value}
          onChange={handleChange}
          className="input-field"
          required
        />
      ))}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
    </form>
  );
};

export default DoctorForm;
