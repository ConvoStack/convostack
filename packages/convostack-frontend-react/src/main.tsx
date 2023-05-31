// TODO ReactDOM no default export (fix)
// @ts-ignore
import ReactDOM from "react-dom";
import "./index.css";
import ConvoStackWrapper from "./ConvoStackWrapper";
import MyComponent from "./components/MyComponent";
import ConvoStackEmbed from "./components/EmbeddableChat/ConvoStackEmbed";

ReactDOM.render(
  <>
    <ConvoStackWrapper
      graphqlUrl="http://localhost:3000/graphql"
      websocketUrl="ws://localhost:3000/graphql"
      customStyling={{ widgetLocation: "left" }}
    >
      <MyComponent text={"Dev's existing content"}></MyComponent>
      <ConvoStackEmbed embedId="tester" />
    </ConvoStackWrapper>
  </>,
  document.getElementById("root")
);
