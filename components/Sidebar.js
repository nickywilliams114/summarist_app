"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { openAuthModal } from "@/redux/userSlice";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle, FiLogIn, FiLogOut } from "react-icons/fi";
import "./Sidebar.css";

function SidebarItem({ icon, text, href, active, onClick, disabled }) {
  const className = `sidebar__link--wrapper ${
    active ? "sidebar__link--active" : ""
  } ${disabled ? "sidebar__link--disabled" : ""}`;

  const content = (
    <>
      <div className="sidebar__link--line"></div>
      <div className="sidebar__link--icon">{icon}</div>
      <div className="sidebar__link--text">{text}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <div className={className} onClick={disabled ? undefined : onClick}>
      {content}
    </div>
  );
}

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const pathname = usePathname();
  const isPlayer = pathname.startsWith("/player");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    onClose();
    dispatch(openAuthModal());
  };

  return (
    <>
      <div
        className={`sidebar__overlay ${isOpen ? "" : "sidebar__overlay--hidden"}`}
        onClick={onClose}
      ></div>
      <nav
        className={`sidebar ${isOpen ? "sidebar--opened" : ""} ${
          isPlayer ? "sidebar--player" : ""
        }`}
      >
        <div className="sidebar__logo">
          <Link href="/" onClick={onClose}>
            <img
              src="/assets/logo.png"
              alt="logo"
              className="sidebar__logo--img"
            />
          </Link>
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <SidebarItem
              icon={<AiOutlineHome />}
              text="For you"
              href="/for-you"
              active={pathname === "/for-you"}
              onClick={onClose}
            />
            <SidebarItem
              icon={<BsBookmark />}
              text="My Library"
              href="/library"
              active={pathname === "/library"}
              onClick={onClose}
            />
            <SidebarItem icon={<RiBallPenLine />} text="Highlights" disabled />
            <SidebarItem icon={<AiOutlineSearch />} text="Search" disabled />
          </div>
          <div className="sidebar__bottom">
            <SidebarItem
              icon={<FiSettings />}
              text="Settings"
              href="/settings"
              active={pathname === "/settings"}
              onClick={onClose}
            />
            <SidebarItem icon={<FiHelpCircle />} text="Help & Support" disabled />
            {user ? (
              <SidebarItem
                icon={<FiLogOut />}
                text="Logout"
                onClick={handleLogout}
              />
            ) : (
              <SidebarItem icon={<FiLogIn />} text="Login" onClick={handleLogin} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
