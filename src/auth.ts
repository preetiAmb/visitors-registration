// auth.js
export const generateDummyToken = () => {
  // Simulate generating a token for the user
  const token = Math.random().toString(36).substring(2);
  // Store the token securely in local storage
  localStorage.setItem('token', token);
};

// auth.ts
export const authenticateUser = (password: string) => {
  // Simulate user authentication
  return password === 'your-secret-password';
};


export const isAuthenticated = () => {
  // Check for the flag in session storage
  return sessionStorage.getItem('authenticated') === 'true';
};

export const logout = () => {
  // Clear the flag in session storage
  sessionStorage.removeItem('authenticated');
  // Clear the token from local storage
  localStorage.removeItem('token');
};
