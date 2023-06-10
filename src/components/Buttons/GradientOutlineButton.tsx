import { Button } from "maki-toolkit";
import styled from "styled-components";

export const GradientOutlineButton = styled(Button).attrs({
    variant: "secondary",
})`
& {
  position: relative;
  border-color: transparent;
}
&:before {
  content: "";
  position: absolute;
  inset: 0;
  border-width: inherit;
  border-radius: inherit; 
  padding: ${({ theme }) => (theme.spacing[1])/2}px;
  background: linear-gradient(93.42deg, #F70139 -0.25%, #BA06F0 50.27%, #00D3F0 99.75%);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
}
`