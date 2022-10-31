import React from 'react';
import ReactDOM from 'react-dom/client';

import "./index.css";

import { BrowserRouter } from 'react-router-dom';

import App from "./App";

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import apiSlice from './redux/apiSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApiProvider api={apiSlice}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApiProvider>
);