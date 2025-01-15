import React from 'react';
import './App.css';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <ContentComponent />
    </div>
  );
}

export default App;
