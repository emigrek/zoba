import { motion } from 'framer-motion'
import { Container } from './ui/Container/Container'

const MotionContainer = motion(Container, { forwardMotionProps: true });

export default MotionContainer;