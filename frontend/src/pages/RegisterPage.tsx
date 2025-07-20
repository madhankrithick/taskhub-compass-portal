import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    mobile: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <Label>Password</Label>
              <Input name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>
            <div>
              <Label>Mobile</Label>
              <Input name="mobile" value={form.mobile} onChange={handleChange} required />
            </div>
            <div>
              <Label>Address</Label>
              <Input name="address" value={form.address} onChange={handleChange} required />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">Register</Button>
            <p className="text-center text-sm mt-2">
              Already registered? <a href="/login" className="underline">Login here</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
