import ReactDOM from "react-dom/client";
import AIChatBox from "../../../";

const chat = new AIChatBox({
  // url: "https://elekb.io/entrance",
  url: "http://127.0.0.1:5500/examples/iframe/index.html",
  styles: {
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
  onOpen: () => {
    console.log("Chat opened");
  },
  onClose: () => {
    console.log("Chat closed");
  },
  onReady: () => {
    chat.init();
    console.log("Chat ready");
  },
  position: "bottom-right",
  payload: {
    uuid: "1234567890",
    sessionId: "1234567890",
    token: "1234567890",
    user: {
      id: "j.t",
      name: "React User",
    },
    lang: "en",
  },
});

function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>AI Chat Box SDK - React Demo</h1>
      <div>
        <button
          onClick={() => {
            if (chat.visible) {
              chat.sendUpdateContext({
                uuid: "111111111",
                sessionId: "1234567890",
                user: {
                  id: "j.t",
                  name: "React 1",
                },
                lang: "en",
              });
            }
            console.log("Chat toggled", chat);
          }}
        >
          💬 Send Update Chat 1
        </button>
        <button
          onClick={() => {
            if (chat.visible) {
              chat.sendUpdateContext({
                uuid: "22222222",
                sessionId: "1234567890",
                user: {
                  id: "j.t",
                  name: "React 2",
                },
                lang: "zh",
              });
            }
            console.log("Chat toggled", chat);
          }}
        >
          💬 Send Update Chat 2
        </button>
        <button
          onClick={() => {
            if (chat.visible) {
              chat.destroy();
            }
            console.log("Chat toggled", chat);
          }}
        >
          💬 Chat closed
        </button>
      </div>
      <button
        onClick={() => {
          chat.toggle();
          console.log("Chat toggled", chat);
        }}
      >
        💬 Visible Chat
      </button>
      <button
        onClick={() => {
          chat.updateConfig({
            position: "bottom-right",
          });
        }}
      >
        💬 right bottom
      </button>
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
            position: "top-right",
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
