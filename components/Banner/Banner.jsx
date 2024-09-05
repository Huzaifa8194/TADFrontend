import React from "react";
import CountDownOne from "../CountDown/CountDownOne";




const Banner = () => {
  return (
    <section className="banner-area banner-bg">
      <div className="banner-shape-wrap">
        <img
          src={"/img/banner/banner_shape01.png"}
          alt=""
          className="img-one"
          style = {{width: '10%', opacity: '0.5'}}
        />
        <img
          src={"/img/banner/banner_shape02.png"}
          alt=""
          className="img-two"
          style = {{width: '10%', opacity: '0.5'}}
        />
        <img
          src={"/img/banner/banner_shape03.png"}
          alt=""
          className="img-three"
          style = {{width: '10%', opacity: '0.5'}}
        />
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="banner-content text-center">
            <img
          src={"/img/banner/banner_shape04.png"}
          alt=""
          className="img-two"
          style = {{width: '10%', opacity: '0.5'}}
        />
              <h2 className="title">
               Mint TheArchitectsDream Token <span>TAD</span><br/> 1 USDC = 1 <span>TAD</span>
              </h2>
              <p style = {{fontSize: '1.3em', paddingBottom: '30px', color: '#ffffff'}}>TAD is a membership benefit construction token. When you buy one we create one, you hold the token, when you sell one we burn one. There is a buy tax, no sales tax! Benefits per token for holding and pledging in real world projects helping you gain more benefits. Visit the shop or the plans and memberships areas, a percent of all sales go into the protocol to help members earn more benefits.</p>
              
              <p style = {{fontSize: '1.3em', paddingBottom: '30px' , color: '#ffffff'}}>By visiting the shop or exploring the plans and memberships sections, you can access a variety of benefits. A percentage of all sales is reinvested into the protocol, helping members earn even more rewards. The TAD token system is designed to maximize the value for its holders, providing ongoing opportunities for growth and engagement.</p>
            
            </div>
           
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="banner-countdown-wrap text-center">
              {/* <h2 className="title">ICO Will Start In..</h2>

              <CountDownOne /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
