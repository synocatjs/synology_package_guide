import React, { useEffect } from 'react';

interface ShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutSection {
  title: string;
  shortcuts: {
    keys: string[];
    description: string;
  }[];
}

export function ShortcutsHelp({ isOpen, onClose }: ShortcutsHelpProps) {
  // 快捷键配置数据
  const shortcutSections: ShortcutSection[] = [
    {
      title: '通用操作',
      shortcuts: [
        { keys: ['?'], description: '打开/关闭帮助窗口' },
        { keys: ['Esc'], description: '关闭弹窗' },
      ],
    },
    {
      title: '导航',
      shortcuts: [
        { keys: ['←', '→'], description: '上/下一项' },
        { keys: ['↑', '↓'], description: '上/下滚动' },
        { keys: ['g', 'd'], description: '跳转到仪表盘' },
      ],
    },
    {
      title: '编辑操作',
      shortcuts: [
        { keys: ['Ctrl', 'S'], description: '保存' },
        { keys: ['Ctrl', 'Z'], description: '撤销' },
        { keys: ['Ctrl', 'Shift', 'Z'], description: '重做' },
        { keys: ['Del'], description: '删除选中项' },
      ],
    },
    {
      title: '搜索与过滤',
      shortcuts: [
        { keys: ['Ctrl', 'K'], description: '打开搜索' },
        { keys: ['/'], description: '聚焦搜索框' },
      ],
    },
  ];

  // ESC 键关闭弹窗
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 阻止页面滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 格式化快捷键显示
  const formatShortcut = (keys: string[]) => {
    return keys.map((key, index) => (
      <React.Fragment key={key}>
        <kbd className="shortcut-key">{key}</kbd>
        {index < keys.length - 1 && <span className="shortcut-plus">+</span>}
      </React.Fragment>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h2>键盘快捷键</h2>
          <button className="close-button" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
        </div>

        <div className="shortcuts-content">
          {shortcutSections.map((section) => (
            <div key={section.title} className="shortcut-section">
              <h3>{section.title}</h3>
              <table className="shortcut-table">
                <tbody>
                  {section.shortcuts.map((shortcut, idx) => (
                    <tr key={idx}>
                      <td className="shortcut-keys">
                        {formatShortcut(shortcut.keys)}
                      </td>
                      <td className="shortcut-description">
                        {shortcut.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="shortcuts-footer">
          <p>按 <kbd>Esc</kbd> 或点击外部区域关闭</p>
        </div>
      </div>
    </div>
  );
}