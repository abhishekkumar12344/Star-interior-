import { useReveal } from '../../hooks/useReveal.js';
import { useCounter } from '../../hooks/useCounter.js';

export default function Counter({ target, suffix = '' }) {
  const [ref, visible] = useReveal();
  const count = useCounter(target, 2000, visible);
  return <span ref={ref}>{count}{suffix}</span>;
}
