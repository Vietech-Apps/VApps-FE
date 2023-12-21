import React from "react";
import AuthWrapper from "../AuthWrapper";
import AppPageMetadata from "meta/core/AppPageMetadata";
import SigninJwtAuth from "./SigninJwtAuth";

const Signin = () => {
  return (
    <AuthWrapper>
      <AppPageMetadata title="Login" />
      <SigninJwtAuth />
    </AuthWrapper>
  );
};

export default Signin;
