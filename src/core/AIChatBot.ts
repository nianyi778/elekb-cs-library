import type { AIChatBotOptions, ChatPayload } from "../types";
import { createIframe, DEFAULT_STYLES } from "../dom/createIframe";
import { resolvePositionStyle } from "../dom/position";

export class AIChatBot {
  private config: AIChatBotOptions;
  private iframe?: HTMLIFrameElement;
  visible = false;
  loading = false;

  constructor(config: AIChatBotOptions) {
    this.config = config;
    this.listenIframeEvents();
  }

  init() {
    const selector = this.config.triggerSelector;
    if (selector) {
      const trigger = document.querySelector(selector);
      if (trigger) {
        trigger.addEventListener("click", () => this.toggle());
      } else {
        console.warn(`[AIChatBot] Cannot find trigger: ${selector}`);
      }
    }
  }

  toggle() {
    if (this.config.mode === "new-tab") {
      window.open(this.buildIframeUrl(), "_blank");
      return;
    }

    const useCustom = this.config.mode === "custom";
    this.ensureIframe(useCustom);
    this.visible = !this.visible;

    if (this.iframe?.style) {
      this.iframe.style.display = this.visible ? "block" : "none";
    }

    if (this.visible) {
      this.config.onOpen?.(true);
    } else {
      this.config.onClose?.(false);
    }
  }

  updateConfig(newConfig: Partial<AIChatBotOptions>) {
    this.config = { ...this.config, ...newConfig };

    if (this.iframe) {
      const newSrc = this.buildIframeUrl();
      if (this.iframe.src !== newSrc) {
        console.debug("[AIChatBot] Updating iframe src:", newSrc);
        this.iframe.src = newSrc;
      }
      this.iframe.className = this.config.class || "";
      this.applyStyles();
    } else {
      const useCustom = this.config.mode === "custom";
      this.ensureIframe(useCustom);
    }
  }

  destroy() {
    this.iframe?.remove();
    this.iframe = undefined;
    this.visible = false;
  }

  sendUpdateContext(context: ChatPayload) {
    if (!this.iframe?.contentWindow) return;

    this.config.payload = {
      ...this.config.payload,
      ...context,
    };

    this.iframe.contentWindow.postMessage(
      {
        type: "AIChat:update",
        payload: this.config.payload,
      },
      this.getIframeOrigin()
    );
  }

  private ensureIframe(useCustomContainer = false) {
    if (!this.iframe) {
      const iframe = createIframe(this.buildIframeUrl());
      iframe.className = this.config.class || "";
      iframe.dataset["chatbox"] = "true";

      iframe.onload = () => {
        this.sendInitContext();
      };

      iframe.onerror = () => {
        console.error("[AIChatBot] Failed to load iframe");
      };

      const container =
        useCustomContainer && this.config.container
          ? typeof this.config.container === "string"
            ? document.querySelector(this.config.container)
            : this.config.container
          : document.body;

      if (container) {
        container.appendChild(iframe);
      } else {
        console.warn("[AIChatBot] Container not found for custom mode.");
      }

      this.iframe = iframe;
    }

    this.applyStyles();
  }

  private applyStyles() {
    if (!this.iframe) return;

    const {
      mode = "popup",
      position = "bottom-right",
      styles = {},
    } = this.config;

    const mergedStyles =
      mode === "custom"
        ? {
            position: "static",
            width: "100%",
            height: "100%",
            border: "none",
            display: this.visible ? "block" : "none",
            ...styles,
          }
        : {
            ...DEFAULT_STYLES,
            ...resolvePositionStyle(position),
            ...styles,
            display: this.visible ? "block" : "none",
          };

    Object.assign(this.iframe.style, mergedStyles);
  }

  private buildIframeUrl(): string {
    const url = new URL(this.config.url);
    const { user, lang, token, uuid, sessionId } = this.config.payload || {};
    const { id, name } = user || {};

    if (id) url.searchParams.set("user_id", id);
    if (name) url.searchParams.set("user_name", name);
    if (token) url.searchParams.set("token", token);
    if (lang) url.searchParams.set("lang", lang);
    if (uuid) url.searchParams.set("uuid", uuid);
    if (sessionId) url.searchParams.set("session_id", sessionId);

    return url.toString();
  }

  private sendInitContext() {
    if (!this.iframe?.contentWindow) return;

    const payload = this.config.payload || {};

    this.iframe.contentWindow.postMessage(
      {
        type: "AIChat:init",
        payload,
      },
      this.getIframeOrigin()
    );
  }

  private listenIframeEvents() {
    window.addEventListener("message", (event) => {
      const { token } = this.config.payload || {};
      const origin = this.getIframeOrigin();
      if (event.origin === origin) {
        if (event.data?.type === "AIChat:close") {
          this.destroy();
          this.config.onClose?.(false);
        }
        if (token) {
          this.loading = true;
          if (event.data?.type === "AIChat:auth") {
            this.loading = false;
            this.config.onAuth?.(event.data.payload);
          }
        } else {
          this.config.onAuth?.();
        }

        if (event.data?.type === "AIChat:error") {
          this.config.onError?.(event.data.payload);
        }
      }
    });
  }

  private getIframeOrigin(): string {
    try {
      const url = new URL(this.config.url);
      return url.origin;
    } catch (e) {
      console.warn("[AIChatBot] Invalid iframe URL for origin extraction");
      return "*"; // fallback for development
    }
  }
}
