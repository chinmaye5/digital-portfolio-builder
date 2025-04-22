import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const PortfolioContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillTag = styled.span`
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const Link = styled.a`
  color: #3498db;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const MediaItem = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MediaImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MediaCaption = styled.p`
  padding: 1rem;
  color: #7f8c8d;
`;

function PortfolioView() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`/api/portfolios/${username}`);
        setPortfolio(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  return (
    <PortfolioContainer>
      <Header>
        <Title>{portfolio.title}</Title>
        <Description>{portfolio.description}</Description>
      </Header>

      {portfolio.skills && portfolio.skills.length > 0 && (
        <Section>
          <SectionTitle>Skills</SectionTitle>
          <SkillsList>
            {portfolio.skills.map((skill, index) => (
              <SkillTag key={index}>{skill}</SkillTag>
            ))}
          </SkillsList>
        </Section>
      )}

      {portfolio.projects && portfolio.projects.length > 0 && (
        <Section>
          <SectionTitle>Projects</SectionTitle>
          <ProjectsGrid>
            {portfolio.projects.map((project, index) => (
              <ProjectCard key={index}>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectLinks>
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </Link>
                  )}
                </ProjectLinks>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </Section>
      )}

      {portfolio.media && portfolio.media.length > 0 && (
        <Section>
          <SectionTitle>Media</SectionTitle>
          <MediaGrid>
            {portfolio.media.map((item, index) => (
              <MediaItem key={index}>
                <MediaImage src={item.url} alt={item.caption} />
                <MediaCaption>{item.caption}</MediaCaption>
              </MediaItem>
            ))}
          </MediaGrid>
        </Section>
      )}
    </PortfolioContainer>
  );
}

export default PortfolioView; 