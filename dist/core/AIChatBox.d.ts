import { AIChatBoxOptions } from "../types";
export declare class AIChatBox {
    private config;
    private iframe?;
    private visible;
    constructor(config: AIChatBoxOptions);
    init(): void;
    toggle(): void;
    updateConfig(newConfig: Partial<AIChatBoxOptions>): void;
    destroy(): void;
    private ensureIframe;
    private applyStyles;
    private buildIframeUrl;
}
