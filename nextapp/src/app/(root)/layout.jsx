import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <p>Navbar</p>
      {children}
    </div>
  );
};

export default Layout;
