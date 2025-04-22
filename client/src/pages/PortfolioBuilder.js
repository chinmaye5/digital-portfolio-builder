import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const BuilderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

const TemplateSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const TemplateCard = styled.div`
  border: 2px solid ${props => props.selected ? '#3498db' : '#ddd'};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    border-color: #3498db;
  }
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const TemplateTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  color: #7f8c8d;
`;

function PortfolioBuilder() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    template: '',
    skills: [],
    projects: [],
    certifications: [],
    media: []
  });
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get('/api/templates');
        setTemplates(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTemplateSelect = templateId => {
    setFormData({ ...formData, template: templateId });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/portfolios', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BuilderContainer>
      <Title>Create Portfolio</Title>
      <Form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Select Template</SectionTitle>
          <TemplateSelector>
            {templates.map(template => (
              <TemplateCard
                key={template.id}
                selected={formData.template === template.id}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <TemplateImage src={template.previewImage} alt={template.name} />
                <TemplateTitle>{template.name}</TemplateTitle>
                <TemplateDescription>{template.description}</TemplateDescription>
              </TemplateCard>
            ))}
          </TemplateSelector>
        </Section>

        <Section>
          <SectionTitle>Basic Information</SectionTitle>
          <Input
            type="text"
            name="title"
            placeholder="Portfolio Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextArea
            name="description"
            placeholder="Portfolio Description"
            value={formData.description}
            onChange={handleChange}
          />
        </Section>

        <Button type="submit">Create Portfolio</Button>
      </Form>
    </BuilderContainer>
  );
}

export default PortfolioBuilder; 