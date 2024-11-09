// src/components/ProgressMessageCard.tsx

import { useState } from 'react';
import { Card, CardActionArea, CardContent, Stack, Typography, Collapse, Box } from '@mui/material';
import { FaChevronDown } from 'react-icons/fa6';
import { IoMdAlert } from 'react-icons/io';
import type { ReactNode } from 'react';

type Message = {
  title: string;
  description: ReactNode;
  buttonTitle: string;
};

interface ProgressMessageCardProps {
  message: Message;
  step: number;
  error: { title: string; description: string } | null;
}

export const ProgressMessageCard = ({ message, step, error }: ProgressMessageCardProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Box
      sx={{
        padding: '1px',
        borderRadius: 4,
        background:
          step === 0 && !error
            ? 'linear-gradient(91.31deg, #FF0043 0.26%, rgba(255, 0, 67, 0.28) 80.13%)'
            : '',
      }}
    >
      <Card variant="outlined" sx={{ borderRadius: 4 }}>
        <CardActionArea onClick={() => setCollapsed(!collapsed)}>
          <CardContent sx={{ p: '22px 32px !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
              <Stack direction="row" alignItems="center" gap={2}>
                {step === 0 && !error && (
                  <Box
                    sx={{
                      background: '#E954544D',
                      borderRadius: 999,
                      display: 'flex',
                      padding: 0.5,
                    }}
                  >
                    <IoMdAlert size={24} style={{ color: '#FF0043' }} />
                  </Box>
                )}
                <Typography variant="h5" fontWeight="600">
                  {message.title}
                </Typography>
              </Stack>
              {message.description && <FaChevronDown style={{ color: '#FFFFFF99' }} />}
            </Stack>
            <Collapse in={!collapsed}>
              {message.description && (
                <Typography
                  color="text.secondary"
                  sx={step === 0 ? { mt: 1.5, ml: 5 } : { mt: 1.5 }}
                >
                  {message.description}
                </Typography>
              )}
            </Collapse>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
