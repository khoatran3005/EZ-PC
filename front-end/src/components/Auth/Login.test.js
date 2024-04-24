import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Login from './Login';

// Mock axios.post to simulate a successful login response
jest.mock('axios');

describe('Login Component', () => {
  test('should render login form with email and password fields', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('should update state when email and password inputs change', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('should show error message for invalid email format', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email address');
    const submitButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Registration Failed. Invalid Email.')).toBeInTheDocument();
    });
  });

  test('should send login request to backend on form submission', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users/login', {
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('should display welcome message on successful login', async () => {
    axios.post.mockResolvedValueOnce({ status: 200, data: { name: 'John' } });

    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Welcome back John')).toBeInTheDocument();
    });
  });
});
