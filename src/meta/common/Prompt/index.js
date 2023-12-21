import React, { useEffect, useState } from "react";
import { useLocation, useNavigation } from "react-router-dom";

const PromptBeforeLeave = ({ formSubmitted, path }) => {
  const navigate = useNavigation();
  const location = useLocation();
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    if (location.pathname !== path && !formSubmitted) {
      setPrompt(true);
    }
  }, [location, formSubmitted, path]);

  const handleLeave = (choice) => {
    if (choice) {
      navigate(location.pathname);
    } else {
      setPrompt(false);
    }
  };

  return (
    <>
      {prompt && (
        <div>
          <p>Are you sure you want to leave this page with unsaved data?</p>
          <button onClick={() => handleLeave(true)}>Leave</button>
          <button onClick={() => handleLeave(false)}>Stay</button>
        </div>
      )}
    </>
  );
};

export default PromptBeforeLeave;
