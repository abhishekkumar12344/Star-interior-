import './ProcessStep.css';

export default function ProcessStep({ step }) {
  return (
    <div className="p-step">
      <div className="p-num">{step.num}</div>
      <h4>{step.title}</h4>
      <p>{step.desc}</p>
    </div>
  );
}
