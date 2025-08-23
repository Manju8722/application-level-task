import React from "react";
import Header from "./Header/Header";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
