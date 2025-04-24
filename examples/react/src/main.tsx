import ReactDOM from "react-dom/client";
import AIChatBox from "../../../";

const chat = new AIChatBox({
  url: "https://elekb.io/entrance",
  styles: {
    width: "400px",
    height: "600px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    color: "#333",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  user: { id: "j.t", name: "React User", lang: "en" },
});

chat.init();

function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>AI Chat Box SDK - React Demo</h1>
      <button onClick={() => chat.toggle()}>💬 Open Chat</button>
      <button
        onClick={() =>
          chat.updateConfig({
            position: "bottom-left",
          })
        }
      >
        💬 left bottom
      </button>
      <button
        onClick={() =>
          chat.updateConfig({
            position: 'top-right',
          })
        }
      >
        💬 right top
      </button>
      {/* <button
        onClick={() =>
          chat.updateConfig({
            position: 'top-left',
          })
        }
      >
        💬 left top
      </button> */}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
