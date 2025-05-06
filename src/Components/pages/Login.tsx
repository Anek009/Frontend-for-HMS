// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (!role) {
//       alert('Please select a role');
//       return;
//     }

//     // Fake auth token and role saving (in real apps, you'd get this from an API)
//     localStorage.setItem('userRole', role);

//     // Redirect based on role
//     if (role === 'Admin') navigate('/admin');
//     else if (role === 'Doctor') navigate('/doctor');
//     else if (role === 'Patient') navigate('/patient');
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="text-3xl font-bold mb-6">Select Your Role</h1>
//       <select
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//         className="mb-4 px-4 py-2 border border-gray-300 rounded"
//       >
//         <option value="">-- Choose a role --</option>
//         <option value="Admin">Admin</option>
//         <option value="Doctor">Doctor</option>
//         <option value="Patient">Patient</option>
//       </select>
//       <button
//         onClick={handleLogin}
//         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//       >
//         Continue
//       </button>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

type Role = 'admin' | 'doctor' | 'patient';

interface LoginFormValues {
  userId: string;
  password: string;
}

const Login = () => {
  const [role, setRole] = useState<Role>('patient');

  const initialValues: LoginFormValues = {
    userId: '',
    password: '',
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required('User ID is required'),
    password: Yup.string().required('Password is required'),
  });

  const getApiUrl = (role: Role): string => {
    switch (role) {
      case 'doctor':
        return 'http://localhost:6969/api/hms/login/doctor';
      case 'admin':
        return 'http://localhost:6969/api/hms/login/admin';
      case 'patient':
        return 'http://localhost:6969/api/patient/login';
      default:
        return '';
    }
  };

  const handleLogin = async (values: LoginFormValues) => {
    const loginData = {
      userId: values.userId,
      password: values.password,
    };

    const apiUrl = getApiUrl(role);

    try {
      const response = await axios.post(apiUrl, loginData);
      console.log('Login successful:', response.data);
      // TODO: redirect to respective dashboard or store token, etc.
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#1d4d85]">
        Login
      </h2>

      {/* Role Selection */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-[#1d4d85]">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="w-full p-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-[#1d4d85]">User ID</label>
            <Field
              name="userId"
              className="w-full p-2 border rounded"
              placeholder="Enter your ID"
            />
            <ErrorMessage
              name="userId"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#1d4d85]">Password</label>
            <Field
              name="password"
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-[#1d4d85] text-white font-bold py-2 px-4 rounded hover:bg-[#2b7dad]"
          >
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
