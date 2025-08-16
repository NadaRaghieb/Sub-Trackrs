import React, { useState, useEffect } from "react";
import SubscriptionForm from "./Components/From/SubscriptionForm";
import SubscriptionList from "./Components/List/SubscriptionList";
import Analytics from './Components/Analytics/Analytics';
import AIAnalysis from "./Components/AIAnalysis/AIAnalysis";
import Logo from './img/logosub.png'
import './app.css';
import Footer from "./Components/Footer/Footer";

function App() {
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem("subscriptions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  

  // 🧹 دالة لحذف الاشتراك
  const handleDelete = (index) => {
  const updated = [...subscriptions];
  updated.splice(index, 1); // حذف حسب الفهرس
  setSubscriptions(updated);
};


  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
       <img 
        src={Logo} 
        alt="logo" 
        className="main-logo" 
      />

      <h1 className="main-title">SubTrack</h1>
     
      <SubscriptionForm setSubscriptions={setSubscriptions} subscriptions={subscriptions} />
      <SubscriptionList subscriptions={subscriptions} onDelete={handleDelete} />
      <Analytics subscriptions={subscriptions} />
      <AIAnalysis subscriptions={subscriptions} />
      <Footer/>
    </div>
  );
}

export default App;
