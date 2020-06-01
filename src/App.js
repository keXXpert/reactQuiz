import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Quiz from './components/Quiz/Quiz';

function App() {
  return (
     <Layout>
       <Quiz />
     </Layout>

  );
}

export default App;