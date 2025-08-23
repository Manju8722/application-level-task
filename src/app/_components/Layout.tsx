import React, { Suspense } from "react";
import Header from "./Header/Header";
import LoadingFallback from "./LoadingFallback";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="mx-auto">
        <Header />
        {children}
      </div>
    </Suspense>
  );
};

export default Layout;
