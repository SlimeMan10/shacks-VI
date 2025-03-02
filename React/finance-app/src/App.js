import React, { useState, useEffect } from 'react';
import api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
    });

    // Fetch transactions from the backend
    const fetchTransactions = async () => {
        try {
            const response = await api.get('/transactions/');
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setTransactions([]); // Ensure state doesn't break if API fails
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Handle form field changes
    const handleInputChange = (event) => {
        const { name, type, checked, value } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post('/transactions/', formData);  // Ensure correct endpoint
            fetchTransactions();
            setFormData({
                amount: '',
                category: '',
                description: '',
                is_income: false,
                date: ''
            });
        } catch (error) {
            console.error("Error submitting transaction:", error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Finance App
                    </a>
                </div>
            </nav>

            <div className="container mt-4">
                <h2>Add Transaction</h2>

                {/* ✅ Wrap all inputs inside one form */}
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">
                            Amount
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="is_income"
                            name="is_income"
                            checked={formData.is_income}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="is_income">
                            Income?
                        </label>
                    </div>

                    {/* ✅ Submit button inside the form */}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>

                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Income?</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default App;