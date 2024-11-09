import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => (
  <motion.div
    initial={{ y: 8, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 8, opacity: 0 }}
    transition={{
      type: 'just',
      stiffness: 260,
      damping: 20,
    }}
    style={{ marginBottom: '140px' }}
  >
    {children}
  </motion.div>
);
