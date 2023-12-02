import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useNavigate} from 'react-router-dom';
import Login from './Login';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Login Component', () => {
    test('renders the login form', () => {
        render(<Login />);

        // Assert that the login form elements are present
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('handles user input correctly', async () => {
        render(<Login />);

        // Simulate user input
        userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');

        // Assert that the input values are updated
        expect(screen.getByPlaceholderText('Email').value).toBe('test@example.com');
        expect(screen.getByPlaceholderText('Password').value).toBe('password123');
    });

    test('submits the form and redirects on successful login', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(<Login />);

        // Mocking the fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'Authentication successful', redirectUrl: '/dashboard' }),
        });

        // Simulate user input
        userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');

        // Simulate form submission
        fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

        // Assert that fetch is called with the correct data
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: 'test@example.com', password: 'password123' }),
        });

        // Assert that the navigate function is called with the correct URL
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'));
    });

    test('displays error message on unsuccessful login', async () => {
        render(<Login />);

        // Mocking the fetch function for unsuccessful login
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ message: 'Authentication failed' }),
        });

        // Simulate user input
        userEvent.type(screen.getByPlaceholderText('Email'), 'invalid@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'invalidpassword');

        // Simulate form submission
        fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

        // Assert that the error message is displayed
        await waitFor(() => expect(screen.getByText('Wrong Email/Password')).toBeInTheDocument());
    });
});
