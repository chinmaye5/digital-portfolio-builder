import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Copyright = styled.p`
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #3498db;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© 2023 Digital Portfolio Builder. All rights reserved.</Copyright>
        <FooterLinks>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 