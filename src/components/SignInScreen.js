import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link, CircularProgress } from '@mui/material';

const SignInScreen = ({ onLogin, onSwitchToSignup, t, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setLocalError('Please enter both username and password');
      return;
    }

    setLocalError('');
    setLoading(true);

    try {
      await onLogin(username.trim(), password);
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
            color: '#000000',
            fontSize: { xs: '28px', md: '32px' }
          }}
        >
          Login
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: '#888', mt: 1 }}
        >
          Admin Access
        </Typography>
      </Box>

<Box 
  component="form" 
  onSubmit={handleSubmit}
  sx={{ 
    width: '100%',
    maxWidth: '100%',
    mx: 'auto'
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

        

        <Box sx={{ minHeight: 40, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(error || localError) ? (
            <Typography 
              sx={{ color: '#d32f2f', fontSize: 14, textAlign: 'center' }}
            >
              {error || localError}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Don't have an account?{' '}
            <Link 
              component="button" 
              onClick={onSwitchToSignup}
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
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInScreen;
