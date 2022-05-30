import React from "react";

export function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-wrapper__main">
      <div className="app-wrapper__child">{children}</div>
    </div>
  );
}
