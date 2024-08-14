import React from 'react';

const ClubsComponent = () => {
    return (
        <div className="clubs-container">
            <div className="section section-top">
                <div className="text-content">
                    <h2 className="section-title">WHY CHOOSE US?</h2>
                    <h1 className="main-title">Friends not followers</h1>
                    <p className="description">
                    Unlike many other social media companies, we’ve built a platform without influencers, followers or likes. Hang-in with your friends and relieve all those moments that were lost long ago in the outerspace.                </p>

                    <h1 className="main-title">Find Your Crew, Be Yourself.</h1>
                    <p className="description">
                    Bubbel connects you with people all over the world. Find your crew based on your interests. All you need to do? Bring yourself. The fun you. The loud you. The crazy you. It all fits on here.                    </p>
                </div>
                <div className="images-wrapper">
                    <img src="./ec.png" alt="Background" className="background-image" />
                    <div className="images-container">
                        <img src="./ui3.png" alt="Club 1" className="club-image1" />
                        <img src="./ui2.png" alt="Club 2" className="club-image2" />
                       
                    </div>
                </div>
            </div>
            
            <div className="section section-middle">
                <div className="images-wrapper">
                <img src="./ec.png" alt="Background" className="background-image1" />
                    <div className="images-container">
                        <img src="./ui4.png" alt="Club 4" className="club-image4" />
                        <img src="./ui5.png" alt="Club 5" className="club-image3" />
                    </div>
                </div>
                <div className="text-content1">
                    <h2 className="section-title">OUR MISSION</h2>
                    <h1 className="main-title">Creators, Friends, Fun.</h1>
                    <p className="description">
                    Making place where content creators relive thier loving moments with their friends and jam around.
                    </p>
                    
                    <h1 className="main-title">Reinventing Clubs, Simplifying Events.</h1>
                    <p className="description">
                    Clubs were having trouble all around the world organizing events and hosting them and promoting them. Bubbel is building the next club platform                    </p>
                    
                </div>
                
                    
                
            </div>
            
            <style jsx>{`
                .clubs-container {
                    font-family: 'Roboto', sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 40px;
                }

                .section {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin-bottom: 60px;
                }

                .section-top, .section-middle {
                    flex-direction: row;
                }

                .section-bottom {
                    flex-direction: column;
                    align-items: center;
                }

                .text-content {
                    max-width: 400px;
                    margin-top: -500px;
                }

                .text-content1 {
                    max-width: 400px;
                    margin-top: 0px;
                }

                .section-title {
                    color:#3A45F3;
                    font-size: 18px;
                    font-weight: bold;
                }

                .main-title {
                    font-size: 32px;
                    font-weight: bold;
                    margin-top: 8px;
                }

                .description {
                    margin-top: 16px;
                    color: #4a4a4a;
                    line-height: 1.5;
                }

                .images-wrapper {
                    position: relative;
                    display: flex;
                    justify-content: center;
                }

                .background-image {
                    position: absolute;
                    width: 70.2%;
                    
                    
                }

                .images-container {
                    display: flex;
                    justify-content: center;
                    gap: 16px;
                }

                .club-image {
                    width: 413px;
                    height: 634px;
                    border-radius: 10px;
                    z-index: 1;
                  
                }

                .club-image1 {
                    width: 312px;
                    height: 534px;
                    border-radius: 26.72px;
                    z-index: 2;
                    transform: translateY(1000px);
                    transform: translateX(45px);
                    margin-top: -250px;
                    box-shadow: -1px -1px 0px blue;
                }

                .club-image2 {
                    width: 312px;
                    height: 534px;
                    border-radius: 26.72px;
                    z-index: 2;
                    transform: translateX(-50px);
                    margin-top: -100px;
                    box-shadow: 1px 1px 0px blue;

                    
                }

                .club-image4 {
                    width: 375px;
                    height: 812px;
                    border-radius: 10px;
                    z-index: 1;
                    transform: translateX(10px);
                    margin-top: -200px;
                  
                }
                .club-image3 {
                    width: 311.66px;
                    height: 438px;
                    border-radius: 10px;
                    z-index: 1;
                    margin-top: -0px;
                    transform: translateX(0px);
                
                  
                }
                .background-image1 {
                    position: absolute;
                    width: 125%;
                    
                    
                }
                    
                  
                }
            `}</style>
        </div>
    );
};

export default ClubsComponent;
