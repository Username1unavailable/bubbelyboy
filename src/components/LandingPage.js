import React from 'react';
import TopBar from './LandingPage/TopBar';
import MainContent from './LandingPage/MainContent';
import ScrollToLearnMore from './LandingPage/ScrollToLearnMore';

const LandingPage = () => {
  return (
    <div>

      <TopBar />
      <MainContent />
        <div style={{marginTop: '100px'}}>
      <ScrollToLearnMore/>
      </div>

    </div>
  );
};

export default LandingPage;