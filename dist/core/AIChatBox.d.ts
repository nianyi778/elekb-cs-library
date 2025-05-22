import { AIChatBoxOptions, ChatSessionPayload } from "../types";
export declare class AIChatBox {
    private config;
    private iframe?;
    visible: boolean;
    constructor(config: AIChatBoxOptions);
    init(): void;
    toggle(): void;
    updateConfig(newConfig: Partial<AIChatBoxOptions>): void;
    destroy(): void;
    sendUpdateContext(context: ChatSessionPayload): void;
    private ensureIframe;
    private applyStyles;
    private buildIframeUrl;
    private sendInitContext;
    private listenIframeEvents;
    private getIframeOrigin;
}
