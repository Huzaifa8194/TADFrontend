import React from "react";

const TopPartners = () => {
  const partners_list = [
    { src: "/img/partner/partner_img01.png", title: "" },
    { src: "/img/partner/partner_img02.png", title: "" },
    { src: "/img/partner/partner_img03.png", title: "" },
    { src: "/img/partner/partner_img04.png", title: "" },
    { src: "/img/partner/partner_img05.png", title: "" },
    { src: "/img/partner/partner_img06.png", title: "" },
    { src: "/img/partner/partner_img07.png", title: "" },
    { src: "/img/partner/partner_img08.png", title: "" },
    { src: "/img/partner/partner_img09.png", title: "" },
    { src: "/img/partner/partner_img10.png", title: "" },
  ];

  return (
    <div className="partner-area pb-130">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-10">
              <span className="sub-title">Our top partner</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="partner-wrap">
              <ul>
                {partners_list.map((item, index) => (
                  <li key={index}>
                    <img src={item.src} alt={item.title} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPartners;
