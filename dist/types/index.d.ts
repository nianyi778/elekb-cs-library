export interface UserInfo {
    /** 用户唯一 ID（建议使用业务方用户 ID） */
    id: string;
    /** 用户昵称（可选） */
    name?: string;
    /** 用户头像 URL（可选） */
    avatar?: string;
    /** 鉴权 token（如有需要，可作为 query 参数传入） */
    token?: string;
    /** 用户语言设置（例如 'zh-CN'、'en-US'） */
    lang?: string;
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
     * 当前用户信息，会作为参数传递给 iframe 页面
     */
    user?: UserInfo;
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
    onOpen?: () => void;
    /**
     * iframe 收起时触发的回调（可用于联动 UI）
     */
    onClose?: () => void;
}
