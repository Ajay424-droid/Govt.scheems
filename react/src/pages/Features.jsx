import React from 'react';
import {
  Container,
  Typography,
  Grid,
  useTheme,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  FaSchool,
  FaTractor,
  FaUsers,
  FaClock
} from 'react-icons/fa';
import { styled } from '@mui/system';

// Styled motion div for the cards with some basic styling
const AnimatedCard = styled(motion.div)({
  borderRadius: 12,
  padding: '20px',
  backgroundColor: '#fff',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  cursor: 'pointer'
});

const Features = () => {
  const theme = useTheme();

  // List of features to display - could be moved to a JSON or config file later
  const featureList = [
    {
      icon: <FaSchool size={48} color={theme.palette.primary.main} />,
      title: 'Student Schemes',
      description: 'Scholarships and education support'
    },
    {
      icon: <FaTractor size={48} color={theme.palette.primary.main} />,
      title: 'Farmer Benefits',
      description: 'Crop subsidies and agricultural programs'
    },
    {
      icon: <FaUsers size={48} color={theme.palette.primary.main} />,
      title: 'Women Empowerment',
      description: 'Women-centric welfare schemes'
    },
    {
      icon: <FaClock size={48} color={theme.palette.primary.main} />,
      title: 'Real-time Updates',
      description: 'Instant deadline alerts and notifications'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
        Key Features
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {featureList.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <AnimatedCard
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              // TODO: Add onClick handler to show more details or link somewhere
            >
              <CardContent>
                {item.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
