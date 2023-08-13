import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
