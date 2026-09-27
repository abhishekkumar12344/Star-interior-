import { useReveal } from '../../hooks/useReveal.js';

export default function Reveal({ children, className = '', delay = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay} ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
