import React from "react";
interface Props {
  children: React.ReactNode;
  filter: React.ReactNode;
}
function Productlayout({ filter, children }: Props) {
  return (
    <div className="flex items-start md:px-12 gap-4">
      <div className="lg:flex-[0.15] hidden lg:block">{filter}</div>
      <div className="lg:flex-[0.85] flex-1"> {children}</div>
    </div>
  );
}

export default Productlayout;
