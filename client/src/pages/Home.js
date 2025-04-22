import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border-radius: 8px;
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #3498db;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #3498db;
`;

const FeatureTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
`;

function Home() {
  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>Build Your Digital Portfolio</HeroTitle>
        <HeroSubtitle>
          Create a stunning portfolio to showcase your skills, projects, and achievements
        </HeroSubtitle>
        <CTAButton to="/register">Get Started</CTAButton>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>🎨</FeatureIcon>
          <FeatureTitle>Beautiful Templates</FeatureTitle>
          <FeatureDescription>
            Choose from professionally designed templates to showcase your work
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>💻</FeatureIcon>
          <FeatureTitle>Code Integration</FeatureTitle>
          <FeatureDescription>
            Showcase your GitHub repositories and live projects
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📱</FeatureIcon>
          <FeatureTitle>Responsive Design</FeatureTitle>
          <FeatureDescription>
            Your portfolio looks great on all devices
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🎯</FeatureIcon>
          <FeatureTitle>Easy to Use</FeatureTitle>
          <FeatureDescription>
            Simple and intuitive interface to build your portfolio
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📊</FeatureIcon>
          <FeatureTitle>Analytics</FeatureTitle>
          <FeatureDescription>
            Track your portfolio's performance and visitor engagement
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🔒</FeatureIcon>
          <FeatureTitle>Privacy Control</FeatureTitle>
          <FeatureDescription>
            Control who can view your portfolio
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </HomeContainer>
  );
}

export default Home; 