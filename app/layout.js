import React from "react";
import "./globals.css";
import "./style.css";
import { ClientProviders } from "./client-providers";

export const metadata = {
  title: "Summarist",
  description: "Gain more knowledge in less time with book summaries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
