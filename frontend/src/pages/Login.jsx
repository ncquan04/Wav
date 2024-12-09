import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { login } from "../redux/features/authSlice";
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({name: '', password: ''});
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', form);
            dispatch(login(response.data.user));
            navigate('/discover');
        } catch (err) {
            setError(err.response?.data?.message || 'Incorrect username or password');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen animate-slowfade">
            <img src={logo} alt="logo" className="w-40 h-40 object-contain mb-6" />
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 border">
                <form className="p-8 rounded-lg shadow-lg">
                    <h2 className="font-bold text-black text-3xl mb-6">Welcome to Lyriks</h2>
                    {error && <p className="text-red-500 text-sm mb-6">{error}</p>}
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full p-2 mb-6 rounded-lg"
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-2 mb-6 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded hover:opacity-70 mb-6"
                        onClick={handleSubmit}
                    >Login</button>
                    <div className="text-base text-center">
                        Haven't registered yet? 
                        <a href="/register" className="text-blue-500 hover:text-blue-800"> Register </a>
                        now
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;
