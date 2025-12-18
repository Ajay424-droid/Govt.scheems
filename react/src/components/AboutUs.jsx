import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  FaSchool,
  FaTractor,
  FaUsers,
  FaClock,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';

const AboutUs = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // TODO: Later pull this from backend for CMS-style editing
  const featureList = [
    {
      icon: <FaSchool size={48} color={theme.palette.primary.main} />,
      title: "Student Schemes",
      text: "Scholarships and education support"
    },
    {
      icon: <FaTractor size={48} color={theme.palette.primary.main} />,
      title: "Farmer Benefits",
      text: "Crop subsidies and agricultural programs"
    },
    {
      icon: <FaUsers size={48} color={theme.palette.primary.main} />,
      title: "Women Empowerment",
      text: "Women-centric welfare schemes"
    },
    {
      icon: <FaClock size={48} color={theme.palette.primary.main} />,
      title: "Real-time Updates",
      text: "Instant deadline alerts and notifications"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Headline */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 6
        }}
      >
        सरकारी योजनाएँ, आपके द्वार
      </Typography>

      {/* Intro: Who we are and Why we do this */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Left: Story */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Our Story
          </Typography>
          <Typography paragraph>
            We kicked this off in 2023 from a college dorm (true story). Fast forward — now we’re helping 50K+ users a month from all over India.
          </Typography>
          <img
            src="/team-photo.jpg"
            alt="Our amazing team"
            style={{
              width: '100%',
              borderRadius: '8px',
              marginTop: '16px'
            }}
          />
        </Grid>

        {/* Right: Our Values */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            What Drives Us
          </Typography>
          <Typography paragraph>
            Access to government help shouldn’t require a degree in law. So we:
          </Typography>
          <ul style={{ paddingLeft: '24px' }}>
            <li>Break down complex jargon</li>
            <li>Support Hindi & English (others soon?)</li>
            <li>Optimize for mobile — because most of us use phones</li>
            <li>Share info without bias or agenda</li>
          </ul>
        </Grid>
      </Grid>

      {/* Feature Cards */}
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Key Features
      </Typography>
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {featureList.map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ height: '100%', textAlign: 'center', py: 2 }}>
              <CardContent>
                {item.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Impact Section */}
      <Grid container spacing={3} sx={{
        backgroundColor: theme.palette.grey[100],
        borderRadius: '8px',
        p: 4,
        mb: 6
      }}>
        <Grid item xs={12} md={4} textAlign="center">
          <Typography variant="h3" color="primary">5000+</Typography>
          <Typography>Successful Applications</Typography>
        </Grid>
        <Grid item xs={12} md={4} textAlign="center">
          <Typography variant="h3" color="primary">29</Typography>
          <Typography>States Covered</Typography>
        </Grid>
        <Grid item xs={12} md={4} textAlign="center">
          <Typography variant="h3" color="primary">24/7</Typography>
          <Typography>Support Availability</Typography>
        </Grid>
      </Grid>

      {/* Get In Touch */}
      <Grid container spacing={3} sx={{ textAlign: 'center', mb: 4 }}>
        <Grid item xs={12} md={6}>
          <FaEnvelope size={32} color={theme.palette.primary.main} />
          <Typography variant="h6" sx={{ mt: 1 }}>Email Us</Typography>
          <Typography>support@sarkariyojanaseva.in</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FaPhone size={32} color={theme.palette.primary.main} />
          <Typography variant="h6" sx={{ mt: 1 }}>Call Us</Typography>
          <Typography>1800-XXX-XXXX</Typography>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Button
          variant="contained"
          size="large"
          sx={{ mr: 2 }}
          href="/schemes"
        >
          Explore Schemes
        </Button>
        <Button
          variant="outlined"
          size="large"
          href="/contact"
        >
          Partner With Us
        </Button>
      </div>
    </Container>
  );
};

export default AboutUs;
