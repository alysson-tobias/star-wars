import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';
import Form from './components/Form';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Form />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
