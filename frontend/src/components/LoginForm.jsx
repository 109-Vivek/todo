import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();

  const signIn = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        username: username,
        password: password,
      });

      if (response.data.token) {
        // Save token to local storage
        localStorage.setItem("token", response.data.token);
        return true; // Return true to indicate successful sign in
      } else {
        // Handle error if token is not received
        console.error("Token not received");
        return false; // Return false to indicate failed sign in
      }
    } catch (error) {
      // Handle error if request fails
      console.error("Error signing in:", error);
      return false; // Return false to indicate failed sign in
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await signIn(formData.email, formData.password)) {
      navigateTo("/dashboard");
      console.log("Sign in successful");
    } else {
      alert("Signin Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 border rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
