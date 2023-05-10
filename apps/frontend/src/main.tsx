import ReactDOM from "react-dom/client";
import "./index.css";
import ConvoStackWrapper from "./ConvoStackWrapper";
import MyComponent from "./components/MyComponent";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ConvoStackWrapper
      graphqlUrl="http://localhost:3000/graphql"
      websocketUrl="ws://localhost:3000/graphql"
      userData={{
        email: "xx.xyz@gmail.com",
        name: "xx",
        anonymousId: "",
        hash: "420",
        externalId: "xyzextid",
      }}
      customStyling={{
        headerColor: "bg-black",
        headerText: "My Custom Header",
        widgetLaunchButtonColor: "bg-black",
        widgetLocation: "left",
        widgetWindowWidth: "w-[370px]",
      }}
    >
      <MyComponent text={"Dev's existing content"}></MyComponent>
    </ConvoStackWrapper>
  </>
);
