(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AIChatBox = factory());
})(this, (function () { 'use strict';

    const DEFAULT_STYLES = {
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '400px',
        height: '600px',
        border: 'none',
        zIndex: '9999',
    };
    function createIframe(url, styles) {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        return iframe;
    }

    function resolvePositionStyle(position) {
        switch (position) {
            case 'top-left':
                return { top: '20px', left: '20px', bottom: 'auto', right: 'auto' };
            case 'top-right':
                return { top: '20px', right: '20px', bottom: 'auto', left: 'auto' };
            case 'bottom-left':
                return { bottom: '80px', left: '20px', top: 'auto', right: 'auto' };
            case 'bottom-right':
            default:
                return { bottom: '80px', right: '20px', top: 'auto', left: 'auto' };
        }
    }

    class AIChatBox {
        config;
        iframe;
        visible = false;
        constructor(config) {
            this.config = config;
            this.listenIframeEvents();
        }
        init() {
            const selector = this.config.triggerSelector;
            if (selector) {
                const trigger = document.querySelector(selector);
                if (trigger) {
                    trigger.addEventListener("click", () => this.toggle());
                }
                else {
                    console.warn(`[AIChatBox] Cannot find trigger: ${selector}`);
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
            }
            else {
                this.config.onClose?.(false);
            }
        }
        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
            if (this.iframe) {
                const newSrc = this.buildIframeUrl();
                if (this.iframe.src !== newSrc) {
                    console.log("[AIChatBox] Updating iframe src:", newSrc);
                    this.iframe.src = newSrc;
                }
                this.applyStyles();
            }
            else {
                const useCustom = this.config.mode === "custom";
                this.ensureIframe(useCustom);
            }
        }
        destroy() {
            this.iframe?.remove();
            this.iframe = undefined;
            this.visible = false;
        }
        sendUpdateContext(context) {
            if (!this.iframe?.contentWindow)
                return;
            this.config.payload = {
                ...this.config.payload,
                ...context,
            };
            this.iframe.contentWindow.postMessage({
                type: "AIChat:update",
                payload: this.config.payload,
            }, "*");
        }
        ensureIframe(useCustomContainer = false) {
            if (!this.iframe) {
                const iframe = createIframe(this.buildIframeUrl());
                iframe.dataset["chatbox"] = "true";
                iframe.onload = () => {
                    this.sendInitContext();
                };
                const container = useCustomContainer && this.config.container
                    ? typeof this.config.container === "string"
                        ? document.querySelector(this.config.container)
                        : this.config.container
                    : document.body;
                if (container) {
                    container.appendChild(iframe);
                }
                else {
                    console.warn("[AIChatBox] Container not found for custom mode.");
                }
                this.iframe = iframe;
            }
            this.applyStyles();
        }
        applyStyles() {
            if (!this.iframe)
                return;
            const { mode = "popup", position = "bottom-right", styles = {}, } = this.config;
            const mergedStyles = mode === "custom"
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
        buildIframeUrl() {
            const url = new URL(this.config.url);
            const { user, lang, token, uuid, sessionId } = this.config.payload || {};
            const { id, name } = user || {};
            if (id)
                url.searchParams.set("user_id", id);
            if (name)
                url.searchParams.set("user_name", name);
            if (token)
                url.searchParams.set("token", token);
            if (lang)
                url.searchParams.set("lang", lang);
            if (uuid)
                url.searchParams.set("uuid", uuid);
            if (sessionId)
                url.searchParams.set("session_id", sessionId);
            return url.toString();
        }
        sendInitContext() {
            if (!this.iframe?.contentWindow)
                return;
            const payload = this.config.payload || {};
            this.iframe.contentWindow.postMessage({
                type: "AIChat:init",
                payload,
            }, this.getIframeOrigin());
        }
        listenIframeEvents() {
            window.addEventListener("message", (event) => {
                const origin = this.getIframeOrigin();
                if (event.data?.type === "AIChat:close" && event.origin === origin) {
                    this.destroy();
                    this.config.onClose?.(false);
                }
            });
        }
        getIframeOrigin() {
            try {
                const url = new URL(this.config.url); // 更可靠：配置中地址恒定
                return url.origin;
            }
            catch (e) {
                console.warn("[AIChatBox] Invalid iframe URL for origin extraction");
                return "*"; // fallback for development
            }
        }
    }

    return AIChatBox;

}));
