import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import './style.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error('Invalid email format.');
            return;
        }

        if (!validatePassword(password)) {
            toast.error(
                'Password must be at least 8 characters, include uppercase, lowercase, number, and a special character.'
            );
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('https://myeshop-backend-k61t.onrender.com/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.toLowerCase(), password }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                navigate('/'); // Navigate to login page
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <Toaster containerClassName="toast-container" />
            <div className="login-box">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-box">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label>Confirm Password</label>
                    </div>
                    <button type="submit" className="btn">Register</button>
                    <div className="signup-link">
                        <Link to="/">SignIn</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
