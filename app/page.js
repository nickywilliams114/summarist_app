"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser, openAuthModal, closeAuthModal } from "@/redux/userSlice";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase";
import "./style.css";
import Authentication from "@/components/Authentication";
import Sidebar from "@/components/Sidebar";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthModalOpen = useSelector((state) => state.user.isAuthModalOpen);

  const handleOpenAuthModal = () => {
    dispatch(openAuthModal());
  };

  const handleCloseAuthModal = () => {
    dispatch(closeAuthModal());
  };

  return (
    <>
      <div id="__next">
        <div className="wrapper wrapper__full">
          <div className="sidebar__overlay sidebar__overlay--hidden"></div>
          <nav className="nav">
            <div className="nav__wrapper">
              <figure className="nav__img--mask">
                <img className="nav__img" src="/assets/logo.png" alt="logo" />
              </figure>
              <ul className="nav__list--wrapper">
                <li
                  className="nav__list nav__list--login"
                  onClick={handleOpenAuthModal}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </li>
                <li className="nav__list nav__list--mobile">About</li>
                <li className="nav__list nav__list--mobile">Contact</li>
                <li className="nav__list nav__list--mobile">Help</li>
              </ul>
            </div>
          </nav>
          <section id="landing">
            <div className="container">
              <div className="row">
                <div className="landing__wrapper">
                  <div className="landing__content">
                    <div className="landing__content__title">
                      Gain more knowledge <br className="remove--tablet" />
                      in less time
                    </div>
                    <div className="landing__content__subtitle">
                      Great summaries for busy people,
                      <br className="remove--tablet" />
                      individuals who barely have time to read,
                      <br className="remove--tablet" />
                      and even people who don’t like to read.
                    </div>
                    <button
                      className="btn home__cta--btn"
                      onClick={handleOpenAuthModal}
                    >
                      Login
                    </button>
                  </div>
                  <figure className="landing__image--mask">
                    <img src="/assets/landing.png" alt="landing" />
                  </figure>
                </div>
              </div>
            </div>
          </section>
          <section id="features">
            <div className="container">
              <div className="row">
                <div className="section__title">
                  Understand books in few minutes
                </div>
                <div className="features__wrapper">
                  <div className="features">
                    <div className="features__icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"></path>
                      </svg>
                    </div>
                    <div className="features__title">Read or listen</div>
                    <div className="features__sub--title">
                      Save time by getting the core ideas from the best books.
                    </div>
                  </div>
                  <div className="features">
                    <div className="features__icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M348 676.1C250 619.4 184 513.4 184 392c0-181.1 146.9-328 328-328s328 146.9 328 328c0 121.4-66 227.4-164 284.1V792c0 17.7-14.3 32-32 32H380c-17.7 0-32-14.3-32-32V676.1zM392 888h240c4.4 0 8 3.6 8 8v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32v-32c0-4.4 3.6-8 8-8z"></path>
                      </svg>
                    </div>
                    <div className="features__title">Find your next read</div>
                    <div className="features__sub--title">
                      Explore book lists and personalized recommendations.
                    </div>
                  </div>
                  <div className="features">
                    <div className="features__icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm330-170c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1z"></path>
                      </svg>
                    </div>
                    <div className="features__title">Briefcasts</div>
                    <div className="features__sub--title">
                      Gain valuable insights from briefcasts
                    </div>
                  </div>
                </div>
                <div className="statistics__wrapper">
                  <div className="statistics__content--header">
                    <div className="statistics__heading">
                      Enhance your knowledge
                    </div>
                    <div className="statistics__heading">
                      Achieve greater success
                    </div>
                    <div className="statistics__heading">
                      Improve your health
                    </div>
                    <div className="statistics__heading">
                      Develop better parenting skills
                    </div>
                    <div className="statistics__heading">
                      Increase happiness
                    </div>
                    <div className="statistics__heading">
                      Be the best version of yourself!
                    </div>
                  </div>
                  <div className="statistics__content--details">
                    <div className="statistics__data">
                      <div className="statistics__data--number">93%</div>
                      <div className="statistics__data--title">
                        of Summarist members <b>significantly increase</b>{" "}
                        reading frequency.
                      </div>
                    </div>
                    <div className="statistics__data">
                      <div className="statistics__data--number">96%</div>
                      <div className="statistics__data--title">
                        of Summarist members <b>establish better</b> habits.
                      </div>
                    </div>
                    <div className="statistics__data">
                      <div className="statistics__data--number">90%</div>
                      <div className="statistics__data--title">
                        of Summarist members <b>have significant positive</b>{" "}
                        change to their professional life.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="reviews">
            <div className="row">
              <div className="container">
                <div className="section__title">What our members say</div>
                <div className="reviews__wrapper">
                  <div className="review">
                    <div className="review__header">
                      <div className="review__name">Hanna M.</div>
                      <div className="review__stars">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reviews__wrapper">
                  <div className="review">
                    <div className="review__header">
                      <div className="review__name">Jane Doe</div>
                      <div className="review__stars">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="review__body">
                      "I learned more in 10 minutes than in 1 month."
                    </div>
                  </div>
                  <div className="review">
                    <div className="review__header">
                      <div className="review__name">John Smith</div>
                      <div className="review__stars">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="review__body">
                      "The selection of books is amazing."
                    </div>
                  </div>
                  <div className="review">
                    <div className="review__header">
                      <div className="review__name">Alice Johnson</div>
                      <div className="review__stars">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="review__body">
                      "Perfect for my commute."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="numbers">
            <div className="container">
              <div className="row">
                <div className="section__title">Numbers that matter</div>
                <div className="numbers__wrapper">
                  <div className="numbers__content">
                    <div className="numbers__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    </div>
                    <div className="numbers__title">
                      <b>20 Million</b>
                      <br />
                      Summaries Read
                    </div>
                  </div>
                  <div className="numbers__content">
                    <div className="numbers__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="numbers__title">
                      <b>5-Star</b>
                      <br />
                      App Rating
                    </div>
                  </div>
                  <div className="numbers__content">
                    <div className="numbers__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </div>
                    <div className="numbers__title">
                      <b>Global</b>
                      <br />
                      Community
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="footer">
            <div className="container">
              <div className="row">
                <div className="footer__top--wrapper">
                  <div className="footer__block">
                    <div className="footer__link--title">Actions</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Magazine</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Cancel Subscription</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Help</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Contact us</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Useful Links</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Pricing</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Business</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Gift Cards</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Authors & Publishers</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Company</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">About</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Careers</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Partners</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Code of Conduct</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Other</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Sitemap</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Legal Notice</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Terms of Service</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Privacy Policies</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer__copyright--wrapper">
                  <div className="footer__copyright">
                    Copyright &copy; 2023 Summarist.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {isAuthModalOpen && (
        <Authentication
          onClose={handleCloseAuthModal}
          onGuestLogin={() => {
            dispatch(setUser({ email: "guest@summarist.com", id: "guest" }));
            handleCloseAuthModal();
            router.push("/for-you");
          }}
          onLogin={async (email, password) => {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
              );
              const user = userCredential.user;
              dispatch(setUser({ email: user.email, id: user.uid }));
              handleCloseAuthModal();
              router.push("/for-you");
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          }}
          onRegister={async (email, password) => {
            try {
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              const user = userCredential.user;
              dispatch(setUser({ email: user.email, id: user.uid }));
              handleCloseAuthModal();
              router.push("/for-you");
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          }}
          onGoogleLogin={async () => {
            try {
              const provider = new GoogleAuthProvider();
              const result = await signInWithPopup(auth, provider);
              const user = result.user;
              dispatch(setUser({ email: user.email, id: user.uid }));
              handleCloseAuthModal();
              router.push("/for-you");
            } catch (error) {
              if (error.code === "auth/popup-closed-by-user") {
                return;
              }
              console.error(error);
              alert(
                "Login failed. Please update your firebase.js with your own project keys. The current keys are invalid for localhost."
              );
            }
          }}
          onForgotPassword={async (email) => {
            try {
              await sendPasswordResetEmail(auth, email);
              alert("Password reset email sent!");
              handleCloseAuthModal();
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          }}
        />
      )}
    </>
  );
}
