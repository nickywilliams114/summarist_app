import "../style.css";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "For You | Summarist",
  description: "Personalized recommendations for you",
};

export default function ForYouPage() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main__content">
        <Search />
        <div className="container">
          <div className="row">
            <div className="section__title">For You</div>
            <div className="features__wrapper">
              <p>Here are your personalized recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
