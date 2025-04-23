export function resolvePositionStyle(position: string): Partial<CSSStyleDeclaration> {
    switch (position) {
      case 'top-left':
        return { top: '20px', left: '20px' ,bottom: 'auto', right: 'auto'};
      case 'top-right':
        return { top: '20px', right: '20px' ,bottom: 'auto', left: 'auto'};
      case 'bottom-left':
        return { bottom: '80px', left: '20px' ,top: 'auto', right: 'auto'};
      case 'bottom-right':
      default:
        return { bottom: '80px', right: '20px' ,top: 'auto', left: 'auto'};
    }
  }