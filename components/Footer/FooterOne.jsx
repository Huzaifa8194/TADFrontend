import { scrollToTop } from "@/lib/helpers";
import Link from "next/link";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const FooterOne = () => {
  const [state, handleSubmit] = useForm("movargka");

  return (
    <footer>
      <div className="footer-area">
        <div className="container">
          <div className="footer-scroll-wrap">
            <button
              className="scroll-to-target"
              data-target="html"
              onClick={scrollToTop}
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
          <div className="footer-top">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div className="footer-widget wow fadeInUp" data-wow-delay=".2s">
                  <Link href="/" className="f-logo">
                    <img src={"/img/logo/logo.png"} alt="Logo" />
                  </Link>
                  <div className="footer-content">
                    <p>The Architectures Dream Token!</p>
                    <ul className="footer-social" style={{marginLeft: '50%', marginRight: '50%'}}>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-discord"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* New Div with Important Links */}
              <div className="col-xl-3 col-lg-6 col-md-6" style = {{marginTop: '60px'}}>
                <div className="footer-widget wow fadeInUp" data-wow-delay=".4s">
                  <h4 className="fw-title">Important Links</h4>
                  <ul>
                    <li>
                      <Link href="/" style ={{marginBottom: '30px', color: 'white', fontSize:'1.3em', fontWeight: '100' }}>Home</Link>
                    </li>
                    <li>
                      <Link style = {{color: 'white' , fontSize:'1.2em',  fontWeight: '100' }} href="/discord">Discord</Link>
                    </li>
                    <li>
                      <Link style ={{color: 'white', fontSize:'1.2em',  fontWeight: '100' }} href="https://www.thearchitectsdream.com/public/resource/token/white_paper/token_white_paper.pdf" target="_blank">Whitepaper</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-3 col-sm-6" style = {{marginTop: '60px'}}>
                <div className="footer-widget wow fadeInUp" data-wow-delay=".6s">
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6" style = {{marginTop: '60px'}}>
                <div className="footer-widget wow fadeInUp" data-wow-delay=".8s">
                  <h4 className="fw-title">Subscribe Newsletter</h4>
                  <div className="footer-newsletter">
                    <form onSubmit={handleSubmit}>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                      <button type="submit" disabled={state.submitting}>
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </form>
                    {state.succeeded && <p>Thanks for subscribing!</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="copyright-text">
                  <p>Copyright &copy; 2024. All Rights Reserved TAD</p>
                </div>
              </div>
              <div className="col-lg-6 d-none d-sm-block">
                <div className="footer-menu" style={{ color: "white" }}>
                  <ul>
                    <li style={{ color: "white" }}>
                      <Link style={{ color: "white" }} href="#">Terms and conditions</Link>
                    </li>
                    <li style={{ color: "white" }}>
                      <Link style={{ color: "white" }} href="#">Privacy policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
