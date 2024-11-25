import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="60" />
    <rect x="158" y="384" rx="30" ry="30" width="123" height="36" />
    <rect x="0" y="283" rx="10" ry="10" width="280" height="26" />
    <rect x="0" y="385" rx="10" ry="10" width="80" height="36" />
  </ContentLoader>
);

export default Skeleton;
