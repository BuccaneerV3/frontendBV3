// src/components/FeatureSection.tsx

import React from 'react';
import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
  reverse?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  imageSrc,
  videoSrc,
  reverse = false,
}) => {
  const theme = useTheme();
  const isMacOs = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        padding: '1px',
        borderRadius: 4,
        mt: 3,
        background: reverse
          ? 'linear-gradient(-90deg, #393F62 0%, rgba(4, 4, 19, 0) 100%)'
          : 'linear-gradient(90deg, #393F62 0%, rgba(4, 4, 19, 0) 100%)',
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          background: {
            xs: isMacOs ? '#1c2658' : '#1c224f',
            md: reverse
              ? `linear-gradient(-90deg, #10132F 0%, ${isMacOs ? '#1c2658' : '#1c224f'} 30%)`
              : `linear-gradient(90deg, #10132F 0%, ${isMacOs ? '#1c2658' : '#1c224f'} 30%)`,
          },
        }}
      >
        <CardContent sx={{ p: '38px 48px !important' }}>
          <Grid
            container
            alignItems="center"
            sx={{
              minHeight: 280,
              flexDirection: {
                xs: 'column',
                md: reverse ? 'row-reverse' : 'row',
              },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="600" gutterBottom>
                {title}
              </Typography>
              <Typography color="text.secondary">{description}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 0 } }}
            >
              {videoSrc ? (
                <Box sx={{ maxWidth: '100%' }}>
                  <Box
                    component="video"
                    disableRemotePlayback
                    loop
                    muted
                    preload="none"
                    playsInline
                    autoPlay
                    sx={{
                      width: '100%',
                      maxWidth: 640,
                      marginTop: {
                        xs: 0,
                        md: '-42px',
                      },
                      marginBottom: {
                        xs: 2,
                        md: '-42px',
                      },
                      height: 'auto',
                    }}
                    src={videoSrc}
                  />
                </Box>
              ) : (
                imageSrc && (
                  <Box
                    component="img"
                    src={imageSrc}
                    alt={title}
                    sx={{
                      width: '100%',
                      maxWidth: 640,
                      marginTop: {
                        xs: 0,
                        md: '-42px',
                      },
                      marginBottom: {
                        xs: 2,
                        md: '-42px',
                      },
                      height: 'auto',
                    }}
                  />
                )
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeatureSection;
