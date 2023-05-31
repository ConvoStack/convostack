// TODO ReactDOM no default export (fix)
// @ts-ignore
import ReactDOM from "react-dom";
import "./index.css";
import ConvoStackWrapper from "./ConvoStackWrapper";
import MyComponent from "./components/MyComponent";

ReactDOM.render(
  <>
    <ConvoStackWrapper
      graphqlUrl="http://localhost:3000/graphql"
      websocketUrl="ws://localhost:3000/graphql"
      customStyling={{ widgetLocation: "left" }}
    >
      <MyComponent text={"Dev's existing content"}></MyComponent>
    </ConvoStackWrapper>
  </>,
  document.getElementById("root")
);
