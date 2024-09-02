import React, { useState, useEffect } from "react";
import cn from "classnames";
import $ from "jquery";
import Link from "next/link";
import { handleClickScroll } from "@/lib/helpers";
import { useRouter } from "next/router";

let flag = true;

const HeaderOne = () => {
  // sticky nav bar
  const [stickyClass, setStickyClass] = useState({
    fixed: "",
    header: "",
  });

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight < 245
        ? setStickyClass({ fixed: "", header: "" })
        : setStickyClass({ fixed: "active-height", header: "sticky-menu" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  // mobile menu
  useEffect(() => {
    if (flag === true) {
      //SubMenu Dropdown Toggle
      if ($(".menu-area li.menu-item-has-children ul").length) {
        $(".menu-area .navigation li.menu-item-has-children").append(
          '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
        );
      }

      //Mobile Nav Hide Show
      if ($(".mobile-menu").length) {
        let mobileMenuContent = $(".menu-area .main-menu").html();
        $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);

        //Dropdown Button
        $(".mobile-menu li.menu-item-has-children .dropdown-btn").on(
          "click",
          function () {
            $(this).toggleClass("open");
            $(this).prev("ul").slideToggle(500);
          }
        );
        //Menu Toggle Btn
        $(".mobile-nav-toggler").on("click", function () {
          $("body").addClass("mobile-menu-visible");
        });

        //Menu Toggle Btn
        $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
          $("body").removeClass("mobile-menu-visible");
        });
      }
    }

    flag = false;
  }, []);

  // active link switching
  const [hash, setHash] = useState("");
  const { asPath, pathname } = useRouter();

  useEffect(() => {
    setHash(asPath.split("#")[1]);
  }, [asPath]);

  const isActiveLink = (id) => {
    return id == "#" + hash ? "active" : "";
  };

  return (
    <header
  id="header"
  style={{
    background: "linear-gradient(179.43deg, #BF814B 13.06%, rgba(11, 29, 51, 0) 100.43%)",
  }}
>
      <div id="header-fixed-height" className={cn(stickyClass.fixed)} />

      <div id="sticky-header" className={cn("menu-area", stickyClass.header)}>
        <div className={cn("container custom-container")}>
          <div className="row">
            <div className="col-12">
              <div className={"mobile-nav-toggler"}>
                <i className="fas fa-bars" />
              </div>

              <div className="menu-wrap">
                <nav className={"menu-nav"}>
                  <div className="logo">
                    <Link href={"/"}>
                      <img src={"/img/logo/logo.png"} style={{ maxWidth: "150px" }} alt="TAD Logo" />
                    </Link>
                  </div>

                  <div className={cn("navbar-wrap main-menu d-none d-lg-flex")}>
                    <ul className={"navigation"}>
                      <li
                        className={cn(
                          (!hash || hash == "header") && "active",
                          "menu-item-has-children"
                        )}
                      >
                        <Link
                          href="#header"
                          className={"section-link"}
                          onClick={() => handleClickScroll("header")}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                      <Link
                          href="#header"
                          className={"section-link"}
                          onClick={() => handleClickScroll("header")}
                        >
                          Discord
                        </Link>
                      </li>

                      <li>
                      <Link
                          href="https://www.thearchitectsdream.com/public/resource/token/white_paper/token_white_paper.pdf"
                          target="_blank"
                          className={"section-link"}
                          onClick={() => handleClickScroll("header")}
                        >
                          Tokenomics
                        </Link>
                      </li>



                      <li className={cn(hash == "about" && "active")}>
                        
                      </li>
                      {/* <li className={isActiveLink("#sales")}> */}
                        {/* <Link
                          href="#sales"
                          className={"section-link"}
                          onClick={() => handleClickScroll("sales")}
                        >
                          Sales
                        </Link>
                      </li> */}
                      {/* <li className={isActiveLink("#roadmap")}>
                        <Link
                          href="#roadmap"
                          className={"section-link"}
                          onClick={() => handleClickScroll("roadmap")}
                        >
                          Roadmap
                        </Link>
                      </li> */}
                      {/* <li className={"menu-item-has-children"}>
                        <Link href="/blog">Blog</Link>
                        <ul className={cn("sub-menu")}>
                          <li className={cn(pathname == "/blog" && "active")}>
                            <Link href="/blog">Our Blog</Link>
                          </li>
                          <li
                            className={cn(
                              pathname == "/blog/blog-details" && "active"
                            )}
                          >
                            <Link href="/blog/blog-details">Blog Details</Link>
                          </li>
                        </ul>
                      </li> */}
                      {/* <li className={isActiveLink("#contact")}>
                        <Link
                          href="#contact"
                          className={"section-link"}
                          onClick={() => handleClickScroll("contact")}
                        >
                          Contact us
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                  <div className={cn("header-action", "d-none d-md-block")}>
                    <ul>
                     
                      <li className={"header-btn"}>
                        <Link href="#" className="btn"  onClick={() => handleClickScroll("home")}>
                           Connect Wallet                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* <!-- Mobile Menu  --> */}
              <div className={"mobile-menu"}>
                <nav className={"menu-box"}>
                  <div className={"close-btn"}>
                    <i className="fas fa-times"></i>
                  </div>
                  <div className={"nav-logo"}>
                    <Link href="/">
                      <img
                        src={"/img/logo/logo-no-text.png"}
                        alt=" Logo"
                        title=""
                      />
                    </Link>
                  </div>

                  <div className={"menu-outer"}>
                    {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header-->  */}
                  </div>

                  <div className={"social-links"}>
                    <ul className="clearfix">
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                     
                     
                    </ul>
                  </div>
                </nav>
              </div>

              <div className={"menu-backdrop"} />
              {/* <!-- End Mobile Menu --> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOne;
