import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation, matchPath } from "react-router-dom";

const _pages = import.meta.globEager("./pages/**/*.tsx");
const pages = Object.keys(_pages).map((path) => {
  const url =
    "/" +
    /\.\/pages(\/.+)\.tsx/
      .exec(path)![1]
      .split("/")
      .map((p) => {
        if (p === "index") {
          return null;
        } else if (p.startsWith("[") && p.endsWith("]")) {
          return ":" + p.substring(1, p.length - 1);
        } else {
          return p;
        }
      })
      .filter(Boolean)
      .join("/");

  return {
    path: url,
    component: _pages[path].default,
    data: _pages[path].preload || (async () => {}),
  };
});

function App() {
  const { pathname } = useLocation();
  const [pageProps, setPageProps] = useState({});

  useEffect(() => {
    for (const page of pages) {
      const match = matchPath(pathname, {
        path: page.path,
        exact: true,
        strict: true,
      });
      if (match) {
        page.data(match.params).then((data: any) => {
          setPageProps(data);
        });
        break;
      }
    }
  }, [pathname]);

  return (
    <>
      <nav className="bg-gray-800 py-10">
        <Link className="text-gray-200 ml-10 text-xl no-underline" to="/">
          Home
        </Link>
        <Link className="text-gray-200 ml-10 text-xl no-underline" to="/about">
          About
        </Link>
      </nav>
      <Switch>
        {pages.map((Page) => (
          <Route key={Page.path} path={Page.path} exact>
            <Page.component {...pageProps} />
          </Route>
        ))}
      </Switch>
    </>
  );
}

export default App;
