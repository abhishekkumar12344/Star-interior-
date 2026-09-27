import './TestimonialCard.css';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="testi">
      <img className="testi-avatar" src={testimonial.avatar} alt={testimonial.name} />
      <div>
        <div className="stars">{'★'.repeat(testimonial.stars)}</div>
        <p>"{testimonial.text}"</p>
        <h5>{testimonial.name}</h5>
        <small>{testimonial.role}</small>
      </div>
    </div>
  );
}
