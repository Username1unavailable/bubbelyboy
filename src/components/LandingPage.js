import React from 'react';
import TopBar from './LandingPage/TopBar';
import MainContent from './LandingPage/MainContent';
import ScrollToLearnMore from './LandingPage/ScrollToLearnMore';
import ClubsComponent from './LandingPage/ClubsComponent';

const LandingPage = () => {
  return (
    <div>

      <TopBar />
      <MainContent />
        <div style={{marginTop: '100px'}}>
      <ScrollToLearnMore/>
      </div>
      <div style={{marginTop: '700px'}}>
      <ClubsComponent/>
      </div>
    </div>
  );
};

export default LandingPage;