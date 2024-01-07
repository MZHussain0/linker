import React from "react";

type Props = {
  children: React.ReactNode;
};

const UriPageLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default UriPageLayout;
