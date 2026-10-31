"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "@/components/CheckoutForm";
import { openAuthModal } from "@/redux/userSlice";
import { PLANS } from "@/lib/plans";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";

import "./style.css";

const FAQS = [
  {
    question: "How does the free 7-day trial work?",
    answer:
      "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },
  {
    question:
      "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    answer:
      "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
  },
  {
    question: "What's included in the Premium plan?",
    answer:
      "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books, high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
  },
  {
    question: "Can I cancel during my trial or subscription?",
    answer:
      "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
  },
];

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState("premium-plus");
  const [openFaq, setOpenFaq] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const isYearly = selectedPlan === "premium-plus";

  const handleCheckout = () => {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }
    setShowCheckout(true);
  };

  if (showCheckout && user) {
    return (
      <CheckoutForm
        planKey={selectedPlan}
        user={user}
        onCancel={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className="plan">
      <div className="plan__header--wrapper">
        <div className="plan__header">
          <div className="plan__title">
            Get unlimited access to many amazing books to read
          </div>
          <div className="plan__sub--title">
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className="plan__img--mask">
            <img src="/assets/pricing-top.png" alt="pricing" />
          </figure>
        </div>
      </div>

      <div className="row">
        <div className="container">
          <div className="plan__features--wrapper">
            <div className="plan__features">
              <figure className="plan__features--icon">
                <IoDocumentTextSharp />
              </figure>
              <div className="plan__features--text">
                <b>Key ideas in few min</b> with many books to read
              </div>
            </div>
            <div className="plan__features">
              <figure className="plan__features--icon">
                <RiPlantFill />
              </figure>
              <div className="plan__features--text">
                <b>3 million</b> people growing with Summarist everyday
              </div>
            </div>
            <div className="plan__features">
              <figure className="plan__features--icon">
                <FaHandshake />
              </figure>
              <div className="plan__features--text">
                <b>Precise recommendations</b> collections curated by experts
              </div>
            </div>
          </div>

          <div className="section__title">Choose the plan that fits you</div>

          {Object.values(PLANS).map((plan, index) => (
            <React.Fragment key={plan.key}>
              {index > 0 && (
                <div className="plan__card--separator">
                  <div className="plan__separator">or</div>
                </div>
              )}
              <div
                className={`plan__card ${
                  selectedPlan === plan.key ? "plan__card--active" : ""
                }`}
                onClick={() => setSelectedPlan(plan.key)}
              >
                <div className="plan__card--circle">
                  {selectedPlan === plan.key && (
                    <div className="plan__card--dot"></div>
                  )}
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">{plan.name}</div>
                  <div className="plan__card--price">
                    ${plan.price}/{plan.interval}
                  </div>
                  <div className="plan__card--text">{plan.trialText}</div>
                </div>
              </div>
            </React.Fragment>
          ))}

          <div className="plan__card--cta">
            <span className="btn--wrapper">
              <button className="btn plan__btn" onClick={handleCheckout}>
                {isYearly
                  ? "Start your free 7-day trial"
                  : "Start your first month"}
              </button>
            </span>
            <div className="plan__disclaimer">
              {isYearly
                ? "Cancel your trial at any time before it ends, and you won’t be charged."
                : "30-day money back guarantee, no questions asked."}
            </div>
          </div>

          <div className="faq__wrapper">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="accordion__card" key={faq.question}>
                  <div
                    className="accordion__header"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <div className="accordion__title">{faq.question}</div>
                    <BsChevronDown
                      className={`accordion__icon ${
                        isOpen ? "accordion__icon--rotate" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`accordion__collapse ${
                      isOpen ? "accordion__collapse--open" : ""
                    }`}
                  >
                    <div className="accordion__body">{faq.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
