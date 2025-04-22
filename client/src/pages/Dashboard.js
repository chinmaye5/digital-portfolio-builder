import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
`;

const CreateButton = styled(Link)`
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    background-color: #2980b9;
  }
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PortfolioCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const PortfolioTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const PortfolioDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const PortfolioActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#3498db' : '#e74c3c'};
  color: white;
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#c0392b'};
  }
`;

function Dashboard() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/portfolios', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPortfolios(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/portfolios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPortfolios(portfolios.filter(portfolio => portfolio._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>My Portfolios</Title>
        <CreateButton to="/builder">Create New Portfolio</CreateButton>
      </Header>
      <PortfolioGrid>
        {portfolios.map(portfolio => (
          <PortfolioCard key={portfolio._id}>
            <PortfolioTitle>{portfolio.title}</PortfolioTitle>
            <PortfolioDescription>{portfolio.description}</PortfolioDescription>
            <PortfolioActions>
              <ActionButton primary as={Link} to={`/portfolio/${portfolio._id}`}>
                View
              </ActionButton>
              <ActionButton onClick={() => handleDelete(portfolio._id)}>
                Delete
              </ActionButton>
            </PortfolioActions>
          </PortfolioCard>
        ))}
      </PortfolioGrid>
    </DashboardContainer>
  );
}

export default Dashboard; 