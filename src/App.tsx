import {
  useEffect,
  useReducer,
  lazy,
  Suspense,
  ReactNode,
  useState,
  createElement
} from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";
import { styled as s, setup } from "goober";
import { Columns, Highlight } from "./components";
import "./styles.css";
const RandomColor = lazy(() => import("./examples/RandomColor"));
const Typography = lazy(() => import("./examples/Typography"));

setup(createElement);

const getStyles = (selector: string) => {
  const tag = document.querySelector(selector) as HTMLStyleElement;
  if (tag?.sheet) {
    return Array.from(tag.sheet.rules)
      .map((rule) => rule.cssText)
      .join("\n");
  }
  return "";
};

function useStyleTagString(
  querySelector: string,
  enabled: boolean,
  cb?: () => void
) {
  const [styles, updateStyles] = useReducer(
    getStyles.bind({}, querySelector),
    ""
  );
  useEffect(() => {
    if (enabled) {
      const targetNode = document.querySelector(querySelector);
      const config = { attributes: true, childList: true, subtree: true };
      const observer = new MutationObserver(() => {
        updateStyles();
        if (cb) setTimeout(cb);
      });
      observer.observe(targetNode as HTMLElement, config);
      updateStyles();
      return () => observer.disconnect();
    }
  }, [querySelector, enabled, cb]);
  return styles;
}

function Safe({ children }: { children: ReactNode }) {
  return <Suspense fallback={<>{"..."}</>}>{children}</Suspense>;
}

const Fixed = s(Columns)`
  position: sticky;
  bottom: 0;
  padding: 20px;
  height: 250px;
  overflow: hidden;
  background: #fafafa;
  border: solid 1px #ddd;
  border-radius: 3px;
`;

const Container = s("div")`
  display: grid;
  gap: 10px;
  place-content: start normal;
  height: 100%;
  overflow: hidden;

  * {
    margin: 0;
  }

  .code {
    height: 100%;
    overflow: auto;
    border-radius: 10px;
  }
`;

const GetStarted = s("div")`padding: 20px; font-size: 150%; font-weight: bold;`;

const scrollToBottom = (id: string) => {
  const code = document.getElementById(id) as HTMLElement;
  code.scrollTop = code.scrollHeight - code.clientHeight;
};

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [enabled, enable] = useReducer(() => true, false);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  const sc = useStyleTagString(
    "[data-styled-version]",
    enabled,
    scrollToBottom.bind({}, "sc-code")
  );
  const tonami = useStyleTagString(
    "style#tonami",
    enabled,
    scrollToBottom.bind({}, "t-code")
  );

  return (
    <div className="App">
      <header className="grid">
        <h1>Tonami Examples</h1>
      </header>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Intro</Tab>
          <Tab>Typography Component</Tab>
          <Tab>Random Color Box</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="grid">
              <p>
                This app aims to show how tonami differs from other CSS-in-JS
                libraries by offering several interactive examples.
              </p>
              <p>
                As you navigate and interact with the examples you can see the
                contents of each library's style tag (which lives in the
                document's head) change in real-time.
              </p>
              <GetStarted>
                Click an Example Above To Get Started{" "}
                <span role="img" aria-label="pointing up">
                  👆
                </span>
              </GetStarted>
            </div>
          </TabPanel>
          <TabPanel>
            {tabIndex === 1 && (
              <Safe>
                <Typography cb={enable} />
              </Safe>
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 2 && (
              <Safe>
                <RandomColor cb={enable} />
              </Safe>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Fixed>
        <Container>
          <p>
            <strong>styled-components</strong> <code>&lt;style/&gt;</code> tag
            contents
          </p>
          <Highlight language="css" className="code" id="sc-code">
            {sc}
          </Highlight>
        </Container>
        <Container>
          <p>
            <strong>tonami</strong>
            <code>&lt;style/&gt;</code> tag contents
          </p>
          <Highlight language="css" className="code" id="t-code">
            {tonami}
          </Highlight>
        </Container>
      </Fixed>
    </div>
  );
}
