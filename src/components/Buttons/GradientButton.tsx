import React from "react";
import { Button, ButtonProps } from "maki-toolkit";
// import styled from "styled-components";

// export const GradientButton = styled(Button)`
//   background: rgb(247,1,57);
//   background: -moz-linear-gradient(93.42deg, #F70139 -0.25%, #BA06F0 50.27%, #00D3F0 99.75%);
//   background: -webkit-linear-gradient(93.42deg, #F70139 -0.25%, #BA06F0 50.27%, #00D3F0 99.75%);
//   background: linear-gradient(93.42deg, #F70139 -0.25%, #BA06F0 50.27%, #00D3F0 99.75%);
// `;

export const GradientButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button  {...props} style={{
    background: 'linear-gradient(93.42deg, #F70139 -0.25%, #BA06F0 50.27%, #00D3F0 99.75%)',
  }}>
    {children}
  </Button>
)