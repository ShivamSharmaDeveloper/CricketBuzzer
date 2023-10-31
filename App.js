import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNev from './src/navigation/AppNev';

function App() {
  return (
    <AuthProvider>
      <AppNev />
    </AuthProvider>
  );
}

export default App;
