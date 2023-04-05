import React from "react";
import Sidebar from "@sidebar/Sidebar";
import Topbar from "@components/elements/Topbar/Topbar";

// const appLayout = {
//   sidebar: {
//     display: "grid",
//   },
//   topbar: {},
//   main: {},
// };

const Layout = ({ children }: { children: React.ReactNode }) => {
  // ^ Daniel => React.ReactNode specifies type  of the 'children' prop as React.ReactNode.
  // From googling I have found out that ReactNode is a type in react "module" that represents renderable component in React
  // in this case children are all components inside <Layout></Layout> (check _app.tsx)

  // This is kinda needed because otherwise Sidebar wont get rendered on other pages, this file is needed for
  // if oyu have repeating components like header footer etc.
  return (
    <>
      <div className="app_wrapper pb-4">
        <Topbar />
        <Sidebar />
        <main className="main bg-gray-800 p-2 w-full rounded-xl mr-4">{children}</main>
      </div>
    </>
  );
};

export default Layout;
