"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
import { BsFileText, BsPeople, BsAward } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

import "./style.css";

const plans = {
  monthly: {
    id: "price_1...monthly",
    name: "Premium Monthly",
    price: 9.99,
    interval: "month",
    trial: "No trial included",
  },
  yearly: {
    id: "price_1...yearly",
    name: "Premium Plus Yearly",
    price: 99.99,
    interval: "year",
    trial: "7-day free trial included",
  },
};

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (showCheckout) {
    const productId =
      selectedPlan === "yearly" ? plans.yearly.id : plans.monthly.id;
    return <CheckoutForm productId={productId} />;
  }

  return (
    <div className="choose-plan__body">
      <div className="choose-plan__header">
        <div className="header__feature">
          <div className="header__feature--icon">
            <BsFileText />
          </div>
          <p>
            Key ideas in few min with many <br /> books to read
          </p>
        </div>
        <div className="header__feature">
          <div className="header__feature--icon">
            <BsPeople />
          </div>
          <p>
            3 million people growing with <br /> Summarist everyday
          </p>
        </div>
        <div className="header__feature">
          <div className="header__feature--icon">
            <BsAward />
          </div>
          <p>
            Precise recommendations <br /> collections curated by experts
          </p>
        </div>
      </div>

      <div className="choose-plan__wrapper">
        <div className="choose-plan__title">Choose the plan that fits you</div>

        <div
          className={`plan__card ${
            selectedPlan === "yearly" ? "plan__card--active" : ""
          }`}
          onClick={() => handleSelectPlan("yearly")}
        >
          <div className="plan__radio"></div>
          <div className="plan__details">
            <div className="plan__name">{plans.yearly.name}</div>
            <div className="plan__price">
              ${plans.yearly.price}/{plans.yearly.interval}
            </div>
            <div className="plan__trial">{plans.yearly.trial}</div>
          </div>
        </div>

        <div className="plan__separator">or</div>

        <div
          className={`plan__card ${
            selectedPlan === "monthly" ? "plan__card--active" : ""
          }`}
          onClick={() => handleSelectPlan("monthly")}
        >
          <div className="plan__radio"></div>
          <div className="plan__details">
            <div className="plan__name">{plans.monthly.name}</div>
            <div className="plan__price">
              ${plans.monthly.price}/{plans.monthly.interval}
            </div>
            <div className="plan__trial">{plans.monthly.trial}</div>
          </div>
        </div>

        <button className="btn plan__cta--btn" onClick={handleCheckout}>
          Start your free 7-day trial
        </button>
        <p className="plan__cta--footer">
          Cancel your trial at any time before it ends, and you won’t be
          charged.
        </p>

        <div className="choose-plan__faq">
          <div
            className="choose-plan__faq--header"
            onClick={() => setIsFaqOpen(!isFaqOpen)}
          >
            <div className="choose-plan__faq--title">
              How does the free 7-day trial work?
            </div>
            <div
              className={`choose-plan__faq--icon ${
                isFaqOpen ? "faq__icon--open" : ""
              }`}
            >
              <FaChevronDown />
            </div>
          </div>
          {isFaqOpen && (
            <div className="choose-plan__faq--answer">
              Begin your complimentary 7-day trial with a Summarist annual
              membership. You are under no obligation to continue your
              subscription, and you will only be billed when the trial period
              expires. With Premium access, you can learn at your own pace and
              as frequently as you desire, and you may terminate your
              subscription prior to the conclusion of the 7-day free trial.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
