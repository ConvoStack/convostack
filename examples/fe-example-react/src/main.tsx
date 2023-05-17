// TODO ReactDOM no default export (fix)
// @ts-ignore
import ReactDOM from "react-dom/client";
import "./index.css";
import { ConvoStackWrapper, EmbedChat } from "convostack/frontend-react";
import MyComponent from "./components/MyComponent";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ConvoStackWrapper
      graphqlUrl="http://localhost:3000/graphql"
      websocketUrl="ws://localhost:3000/graphql"
      userData={{
        email: "m@g.com",
        name: "zxx",
        anonymousId: "",
        hash: "z420",
        externalId: "m",
      }}
      customStyling={{
        headerColor: "bg-black",
        headerText: "My Custom Header",
        widgetLaunchButtonColor: "bg-black",
        widgetLocation: "right",
        widgetWindowWidth: "w-[370px]",
      }}
    >
      <MyComponent text={"Dev's existing content"}></MyComponent>
      <div className="flex flex-row">
        <EmbedChat id={"test"} />
        <EmbedChat id={"test2"} />
        <EmbedChat id={"test3"} />
        {/* <h1 className="text-center text-5xl text-black">HEY</h1>
        <div className="border border-black w-10 h-10 " /> */}
      </div>
    </ConvoStackWrapper>
  </>
);
