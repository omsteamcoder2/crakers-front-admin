import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🆕 track login state
  const location = useLocation();
  const navigate = useNavigate(); // 🆕 to navigate after logout

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 🆕 check token on load or route change
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    "Home",
    "About us",
    "Services",
    "Projects",
    "Gallery",
    "Blog",
    "Contact",
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" onClick={scrollToTop}>
          <img src="/assets/images/logo.png" alt="Logo" className="h-10 md:h-12 w-auto rounded-lg" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                onClick={item === "Home" ? scrollToTop : closeMenu}
                className={`text-lg font-medium transition-colors duration-300 ${
                  scrolled ? "text-gray-800 hover:text-red-800" : "text-white hover:text-red-300"
                } ${
                  (location.pathname === "/" && item === "Home") ||
                  location.pathname === `/${item.toLowerCase().replace(" ", "-")}`
                    ? "border-b-2 border-red-800"
                    : ""
                }`}
              >
                {item}
              </Link>
            ))}

            {/* 🆕 Show Dashboard if logged in, else show Login */}
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className={`text-lg font-medium ${
                  scrolled ? "text-red-700 hover:text-red-800" : "text-white hover:text-red-300"
                }`}
              >
                Dashboard
              </Link>
            ) : (
<></>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-red-800" onClick={toggleMenu}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white mt-4 rounded-lg shadow-lg py-4 px-2 absolute left-4 right-4">
            <ul className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    onClick={() => {
                      closeMenu();
                      if (item === "Home") scrollToTop();
                    }}
                    className={`block px-4 py-2 text-lg font-medium text-gray-800 hover:bg-red-100 hover:text-red-800 rounded-md ${
                      (location.pathname === "/" && item === "Home") ||
                      location.pathname === `/${item.toLowerCase().replace(" ", "-")}`
                        ? "bg-red-100 text-red-800"
                        : ""
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              ))}

              {/* 🆕 Dashboard or Login in mobile menu */}
              {isLoggedIn ? (
                <li>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-lg font-medium text-gray-800 hover:bg-red-100 hover:text-red-800 rounded-md"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-lg font-medium text-gray-800 hover:bg-red-100 hover:text-red-800 rounded-md"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
