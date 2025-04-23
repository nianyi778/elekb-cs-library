import { AIChatBoxOptions } from "../types";
import { createIframe, DEFAULT_STYLES } from "../dom/createIframe";
import { resolvePositionStyle } from "../dom/position";

export class AIChatBox {
  private config: AIChatBoxOptions;
  private iframe?: HTMLIFrameElement;
  private visible = false;

  constructor(config: AIChatBoxOptions) {
    this.config = config;
  }

  init() {
    const selector = this.config.triggerSelector;
    if (selector) {
      const trigger = document.querySelector(selector);
      if (trigger) {
        trigger.addEventListener("click", () => this.toggle());
      } else {
        console.warn(`[AIChatBox] Cannot find trigger: ${selector}`);
      }
    }
  }

  toggle() {
    switch (this.config.mode) {
      case 'new-tab': {
        window.open(this.buildIframeUrl(), '_blank');
        break;
      }
      case 'custom': {
        this.ensureIframe(true);
        this.visible = !this.visible;
        this.iframe?.style && (this.iframe.style.display = this.visible ? 'block' : 'none');
        this.visible ? this.config.onOpen?.() : this.config.onClose?.();
        break;
      }
      case 'popup':
      default: {
        this.ensureIframe();
        this.visible = !this.visible;
        this.iframe?.style && (this.iframe.style.display = this.visible ? 'block' : 'none');
        this.visible ? this.config.onOpen?.() : this.config.onClose?.();
        break;
      }
    }
  }

  updateConfig(newConfig: Partial<AIChatBoxOptions>) {
    this.config = { ...this.config, ...newConfig };
    if (this.iframe) {
      this.iframe.src = this.buildIframeUrl();
      this.applyStyles();
    } else {
      const useCustom = this.config.mode === 'custom';
      this.ensureIframe(useCustom);
    }
  }

  destroy() {
    this.iframe?.remove();
    this.iframe = undefined;
    this.visible = false;
  }

  private ensureIframe(useCustomContainer = false) {
    if (!this.iframe) {
      const iframe = createIframe(this.buildIframeUrl());
      iframe.dataset['chatbox'] = 'true';

      if (useCustomContainer && this.config.container) {
        const container =
          typeof this.config.container === 'string'
            ? document.querySelector(this.config.container)
            : this.config.container;
        if (container) {
          container.appendChild(iframe);
        } else {
          console.warn('[AIChatBox] Container not found for custom mode.');
        }
      } else {
        document.body.appendChild(iframe);
      }

      this.iframe = iframe;
    }
    this.applyStyles();
  }

  private applyStyles() {
    if (!this.iframe) return;

    const { mode = 'popup', position = 'bottom-right', styles = {} } = this.config;

    const mergedStyles =
      mode === 'custom'
        ? {
            position: 'static',
            width: '100%',
            height: '100%',
            border: 'none',
            display: this.visible ? 'block' : 'none',
            ...styles
          }
        : {
            ...DEFAULT_STYLES,
            ...resolvePositionStyle(position),
            ...styles,
            display: this.visible ? 'block' : 'none'
          };

    Object.assign(this.iframe.style, mergedStyles);
  }

  private buildIframeUrl(): string {
    const url = new URL(this.config.url);
    const { user } = this.config;
    if (user) {
      const { id, name, avatar, token, lang } = user;
      if (id) url.searchParams.set("user_id", id);
      if (name) url.searchParams.set("name", name);
      if (avatar) url.searchParams.set("avatar", avatar);
      if (token) url.searchParams.set("token", token);
      if (lang) url.searchParams.set("lang", lang);
    }
    return url.toString();
  }
}