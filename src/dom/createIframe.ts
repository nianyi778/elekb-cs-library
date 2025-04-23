export const DEFAULT_STYLES: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    width: '400px',
    height: '600px',
    border: 'none',
    zIndex: '9999',
}

export function createIframe(url: string, styles?: Partial<CSSStyleDeclaration>): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.src = url;

    if (styles) {
        Object.assign(iframe.style, styles);
    } 
    return iframe;
  }