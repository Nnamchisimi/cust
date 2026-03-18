import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link, CircularProgress } from '@mui/material';

const API_URL = 'http://localhost:30090';

const SignUpScreen = ({ onSwitchToLogin, t }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [localSuccess, setLocalSuccess] = useState('');
  const [step, setStep] = useState('register'); // 'register' or 'verify'
  const [userId, setUserId] = useState(null);

  const validateForm = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setLocalError('Please enter username, email and password');
      return false;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return false;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLocalError('');
    setLocalSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLocalError(data.error || 'Failed to send verification code');
        return;
      }

      setUserId(data.userId);
      setLocalSuccess('Verification code sent to your email!');
      setStep('verify');
    } catch (err) {
      setLocalError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLocalError('');
    setLocalSuccess('');

    if (!verificationCode.trim()) {
      setLocalError('Please enter the verification code');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, code: verificationCode.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLocalError(data.error || 'Invalid verification code');
        return;
      }

      setLocalSuccess('Email verified successfully! You can now sign in.');
      
      // Switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setLocalError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLocalError('');
    setLocalSuccess('');

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/resend-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLocalError(data.error || 'Failed to resend code');
        return;
      }

      setLocalSuccess('New verification code sent to your email!');
    } catch (err) {
      setLocalError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 2000,
        mx: 'auto',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#C0C0C0',
            fontSize: { xs: '28px', md: '32px' }
          }}
        >
          {step === 'register' ? 'Sign Up' : 'Verify Email'}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: '#888', mt: 1 }}
        >
          {step === 'register' ? 'Create Admin Account' : 'Enter the code sent to your email'}
        </Typography>
      </Box>

      {step === 'register' ? (
        <Box 
          component="form" 
          onSubmit={handleSendCode}
          sx={{ 
            width: '100%',
            maxWidth: '100%',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ fontWeight: 600, color: '#333', mb: 1 }}
          >
            Username
          </Typography>
          <TextField
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            type="text"
            variant="outlined"
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }
            }}
          />

          <Typography 
            variant="body2" 
            sx={{ fontWeight: 600, color: '#333', mb: 1 }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            variant="outlined"
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }
            }}
          />

          <Typography 
            variant="body2" 
            sx={{ fontWeight: 600, color: '#333', mb: 1 }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
            variant="outlined"
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }
            }}
          />

          <Typography 
            variant="body2" 
            sx={{ fontWeight: 600, color: '#333', mb: 1 }}
          >
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            type="password"
            variant="outlined"
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }
            }}
          />

          <Box sx={{ minHeight: 40, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {localError ? (
              <Typography 
                sx={{ color: '#d32f2f', fontSize: 14, textAlign: 'center' }}
              >
                {localError}
              </Typography>
            ) : null}

            {localSuccess ? (
              <Typography 
                sx={{ color: '#2e7d32', fontSize: 14, textAlign: 'center' }}
              >
                {localSuccess}
              </Typography>
            ) : null}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#C0C0C0',
              color: '#000',
              py: 1.5,
              minHeight: 48,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 16,
              '&:hover': {
                backgroundColor: '#a0a0a0',
              },
              '&.Mui-disabled': {
                backgroundColor: '#e0e0e0',
                color: '#999',
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Verification Code'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Already have an account?{' '}
              <Link 
                component="button" 
                onClick={onSwitchToLogin}
                sx={{ 
                  color: '#C0C0C0',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box 
          component="form" 
          onSubmit={handleVerify}
          sx={{ 
            width: '100%',
            maxWidth: '100%',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ fontWeight: 600, color: '#333', mb: 1 }}
          >
            Verification Code
          </Typography>
          <TextField
            fullWidth
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 6 }}
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }
            }}
          />

          <Typography 
            variant="body2" 
            sx={{ color: '#666', mb: 2, fontSize: 14 }}
          >
            Code sent to: {email}
          </Typography>

          <Box sx={{ minHeight: 40, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {localError ? (
              <Typography 
                sx={{ color: '#d32f2f', fontSize: 14, textAlign: 'center' }}
              >
                {localError}
              </Typography>
            ) : null}

            {localSuccess ? (
              <Typography 
                sx={{ color: '#2e7d32', fontSize: 14, textAlign: 'center' }}
              >
                {localSuccess}
              </Typography>
            ) : null}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#C0C0C0',
              color: '#000',
              py: 1.5,
              minHeight: 48,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 16,
              '&:hover': {
                backgroundColor: '#a0a0a0',
              },
              '&.Mui-disabled': {
                backgroundColor: '#e0e0e0',
                color: '#999',
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Email'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              onClick={handleResendCode}
              disabled={loading}
              sx={{ 
                color: '#C0C0C0',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Resend Code
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Wrong email?{' '}
              <Link 
                component="button" 
                onClick={() => {
                  setStep('register');
                  setLocalError('');
                  setLocalSuccess('');
                  setVerificationCode('');
                }}
                sx={{ 
                  color: '#C0C0C0',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Go Back
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SignUpScreen;
