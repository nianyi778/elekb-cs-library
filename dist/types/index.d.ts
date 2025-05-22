export interface ChatSessionPayload {
    /** 会话相关信息 */
    uuid: string;
    sessionId: string;
    /** 本地化语言 */
    lang?: 'zh' | 'en' | 'ja';
    /** 当前功能上下文 */
    feature?: string;
    menu?: {
        id: string;
        name: string;
    };
    /** 当前用户信息 */
    user?: {
        id: string;
        name: string;
    };
    /** 鉴权令牌 */
    token?: string;
    /** 标签（权限/角色/客户分级等） */
    tags?: string[];
    /** 自定义信息 */
    customData?: unknown;
}
export interface AIChatBoxOptions {
    /**
     * 聊天页面的地址（iframe 的 src 或新标签页跳转用）
     */
    url: string;
    /**
     * iframe 的内联样式，用于自定义宽高、圆角、阴影等视觉效果
     * 示例：{ width: '400px', height: '600px', borderRadius: '12px' }
     */
    styles?: Partial<CSSStyleDeclaration>;
    /**
     * 会话框打开的方式：
     * - 'popup': 以浮窗方式打开（默认）
     * - 'new-tab': 新开标签页打开
     * - 'custom': 挂载到用户指定容器（container）中
     */
    mode?: 'popup' | 'new-tab' | 'custom';
    /**
     * 弹窗位置（仅在 mode 为 'popup' 时生效）
     */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /**
     * 交互信息，会作为参数传递给 iframe 页面
     */
    payload?: ChatSessionPayload;
    /**
     * 触发按钮的选择器（如 '#chatBtn'），SDK 会自动绑定点击事件
     * 支持所有模式，但也可选择手动调用 chat.toggle()
     */
    triggerSelector?: string;
    /**
     * 自定义容器挂载点（仅在 mode 为 'custom' 时生效）
     * 可传 HTMLElement 或 DOM 选择器字符串（如 '#chatContainer'）
     */
    container?: HTMLElement | string;
    /**
     * 可选的主题参数，可用于 iframe 内部样式控制
     * 通常为 'light' 或 'dark'
     */
    theme?: 'light' | 'dark';
    /**
     * iframe 展开时触发的回调（可用于联动 UI）
     */
    onOpen?: (visible: boolean) => void;
    /**
     * iframe 收起时触发的回调（可用于联动 UI）
     */
    onClose?: (visible: boolean) => void;
}
