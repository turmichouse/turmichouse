import React, { useState } from 'react'
import Forms from './Forms';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'
export default function Main() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));

    const correctUsername = 'turmic';
    const correctPassword = 'house123@321';
    const handleLogin = () => {
        if (username === correctUsername && password === correctPassword) {
            localStorage.setItem('user', JSON.stringify({ username }));
            setLoggedIn(true);
        } else {
            alert('Incorrect username or password');
        }
    };
    const clearSession = () => {
        localStorage.removeItem('user');
        setLoggedIn(false);
    }

    if (loggedIn) {
        return (
            <div style={{ backgroundColor: '#0E1317', color: 'white!important' }}>
                <div className='container xxxs py-5' >

                    <Forms />
                    <button type="button" className="btn btn-primary mt-5" onClick={clearSession}>Logout</button>

                </div></div>
        );
    } else {
        return (
            <div className="container mt-5" style={{ maxWidth: '1300px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="card-title text-center">Login</h1>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="button" className="btn btn-primary"
                                        onClick={handleLogin}>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

