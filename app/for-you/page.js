import "../style.css";

export const metadata = {
  title: "For You | Summarist",
  description: "Personalized recommendations for you",
};

export default function ForYouPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="section__title">For You</div>
        <div className="features__wrapper">
          <p>Here are your personalized recommendations.</p>
        </div>
      </div>
    </div>
  );
}
