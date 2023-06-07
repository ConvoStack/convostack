// TODO ReactDOM no default export (fix)
// @ts-ignore
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ConvoStackWrapper,
  ConvoStackEmbed,
  ConvoStackWidget,
} from "convostack/frontend-react";
import MyComponent from "./components/MyComponent";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ConvoStackWrapper>
      <ConvoStackWidget
        graphqlUrl="http://localhost:3000/graphql"
        websocketUrl="ws://localhost:3000/graphql"
        // workspaceId="clijh54bz0009wud1v4yhrt8o"
        // userData={{
        //   email: "m@sdfgfsdgg.com",
        //   name: "zxx",
        //   hash: "z420",
        //   userId: "mmsxsddfmm",
        // }}
        customStyling={{
          headerText: "My Custom Header",
          widgetLocation: "right",
        }}
      />
      <MyComponent text={"Dev's existing content"}></MyComponent>
      <ol>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ol>
      <div className="flex flex-row">
        <ConvoStackEmbed embedId="test" />
        {/* <h1 className="text-center text-5xl text-black">HEY</h1>
        <div className="border border-black w-10 h-10 " /> */}
      </div>
    </ConvoStackWrapper>
  </>
);
