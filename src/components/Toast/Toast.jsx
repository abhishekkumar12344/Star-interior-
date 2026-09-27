import './Toast.css';

export default function Toast({ message }) {
  return (
    <div className="toast show">
      <i>✓</i>
      <span>{message}</span>
    </div>
  );
}
