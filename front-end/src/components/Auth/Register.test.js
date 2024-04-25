// Register.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Register from './Register';

// Mock axios.post to simulate a successful registration response
jest.mock('axios');

describe('Register Component', () => {
  test('should render registration form with name, email, password, and retype password fields', () => {
    const { getByPlaceholderText } = render(<Register />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const retypePasswordInput = getByPlaceholderText('Retype Password');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(retypePasswordInput).toBeInTheDocument();
  });

  test('should update state when inputs change', () => {
    const { getByPlaceholderText } = render(<Register />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const retypePasswordInput = getByPlaceholderText('Retype Password');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(retypePasswordInput, { target: { value: 'password123' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(retypePasswordInput).toHaveValue('password123');
  });

  test('should send registration request to backend on form submission', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const retypePasswordInput = getByPlaceholderText('Retype Password');
    const submitButton = getByText('Sign Up');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(retypePasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users', {
        name: 'mo',
        email: 'mo@gmail.com',
        password: 'mo',
      });
    });
  });

  test('should redirect to login page on successful registration', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    const { getByPlaceholderText, getByText } = render(<Register />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const retypePasswordInput = getByPlaceholderText('Retype Password');
    const submitButton = getByText('Sign Up');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(retypePasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.href).toBe('/login');
    });
  });
});
