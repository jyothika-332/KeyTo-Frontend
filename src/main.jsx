import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContext from './components/Context/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext>
  <GoogleOAuthProvider clientId='610398101722-8loi5jqkk4u1efri1m5fuhuklp83rcdd.apps.googleusercontent.com'>

    <App />

  </GoogleOAuthProvider>
  </AuthContext>
)
