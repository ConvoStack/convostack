// TODO ReactDOM no default export (fix)
// @ts-ignore
import ReactDOM from "react-dom";
import "./index.css";
import ConvoStackWrapper from "./ConvoStackWrapper";
import MyComponent from "./components/MyComponent";
import EmbedChat from "./components/EmbeddableChat/ConvoStackEmbed";

ReactDOM.render(
  <>
    <ConvoStackWrapper
      graphqlUrl="http://localhost:3000/graphql"
      websocketUrl="ws://localhost:3000/graphql"
    >
      <MyComponent text={"Dev's existing content"}></MyComponent>
      <div className="flex flex-row">
        {/* <EmbedChat embedId={"dddd"} /> */}
        {/* <EmbedChat embedId={"test2"} />
        <EmbedChat embedId={"test3"} />
        <EmbedChat embedId={"test4"} />
        <EmbedChat embedId={"test5"} />
        <EmbedChat embedId={"test6"} />
        <EmbedChat embedId={"test7"} />
        <EmbedChat embedId={"test8"} /> */}
      </div>
    </ConvoStackWrapper>
  </>,
  document.getElementById("root")
);
