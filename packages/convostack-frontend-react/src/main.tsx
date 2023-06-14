// TODO ReactDOM no default export (fix)
// @ts-ignore
import ReactDOM from "react-dom";
import "./index.css";
import ConvoStackWrapper from "./ConvoStackWrapper";
import MyComponent from "./components/MyComponent";
import ConvoStackEmbed from "./components/EmbeddableChat/ConvoStackEmbed";
import ConvoStackWidget from "./ConvoStackWidget";

ReactDOM.render(
  <>
    <ConvoStackWrapper>
      <ConvoStackWidget
        graphqlUrl="http://localhost:3000/graphql"
        websocketUrl="ws://localhost:3000/graphql"
        // workspaceId="<<<hosted workspace id>>>"
        customStyling={{ widgetLocation: "left" }}
      />
      <MyComponent text={"Dev's existing content"}></MyComponent>
      <div style={{ display: "flex", flexDirection: "row", width: "50%" }}>
        <div className="mb-4 w-full">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <textarea
            id="name"
            rows={4}
            className="w-full border border-gray-300 p-2 rounded-md resize-none"
          />
        </div>
        <ConvoStackEmbed
          embedId="tester"
          customStyling={{
            embedWidth: "0px",
            embedFlex: "1 1 auto",
            embedHeight: "500px",
          }}
        />

        {/* <div style={{ backgroundColor: "red", width: "800px" }} /> */}
      </div>
    </ConvoStackWrapper>
  </>,
  document.getElementById("root")
);
