import React from "react";

type ErrorDisplayProps = {
  showError: boolean;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ showError }) => {
  if (!showError) {
    return null;
  }

  return <div>Error loading todos. Please try again later.</div>;
};

export default ErrorDisplay;
