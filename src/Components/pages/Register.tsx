// import { useState } from 'react';
import PatientForm from './PatientForm';
import DoctorForm from './DoctorForm';
import { useState } from 'react';
type Role = 'patient' | 'doctor';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<Role>('patient');

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        {['patient', 'doctor'].map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role as Role)}
            className={`py-2 px-4 font-bold ${
              selectedRole === role
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)} Register
          </button>
        ))}
      </div>

      {/* Form based on selected role */}
      {selectedRole === 'patient' ? <PatientForm /> : <DoctorForm />}
    </div>
  );
};

export default Register;
