import './Preloader.css';

export default function Preloader({ loading }) {
  return (
    <div className={`preloader ${!loading ? 'hide' : ''}`}>
      <div className="loader-mark"><span>S</span></div>
      <p>Skystar Interiors</p>
    </div>
  );
}
