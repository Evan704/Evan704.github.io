// 文件路径: assets/js/custom-copy.js (最终完美版 - 兼容表格行号)

document.addEventListener('DOMContentLoaded', () => {
  // 找到页面上所有的自定义代码块容器
  const allCodeContainers = document.querySelectorAll('.custom-code-container');

  allCodeContainers.forEach(container => {
    // 在每个容器内分别查找复制按钮
    const copyButton = container.querySelector('.custom-code-copy-btn');
    
    // --- 终极精确选择器 ---
    // 直接在容器内查找那个带有 data-lang 属性的 <code> 标签。
    // 这能精确地定位到包含代码的右侧单元格，完全忽略左侧的行号。
    const codeElement = container.querySelector('code[data-lang]');

    // 确保按钮和代码块都找到了，再添加事件监听
    if (copyButton && codeElement) {
      copyButton.addEventListener('click', () => {
        // 检查剪贴板 API 的可用性（安全上下文）
        if (!navigator.clipboard) {
          console.error('剪贴板 API 在当前环境不可用 (需要 localhost 或 https)。');
          alert('复制功能仅在 https 或 localhost 环境下可用。');
          return;
        }

        // --- 提取纯代码文本 ---
        // 因为我们的选择器已经非常精确，所以可以直接提取 innerText。
        const codeText = codeElement.innerText;
        
        // --- 执行复制操作 ---
        navigator.clipboard.writeText(codeText).then(() => {
          // --- 复制成功后的视觉反馈 ---
          const buttonSpan = copyButton.querySelector('span');
          const originalText = 'Copy';
          const copiedText = copyButton.dataset.copiedText;

          // 1. 更改按钮文字和样式
          buttonSpan.innerText = copiedText;
          copyButton.classList.add('copied');

          // 2. 2秒后恢复原样
          setTimeout(() => {
            buttonSpan.innerText = originalText;
            copyButton.classList.remove('copied');
          }, 1000);

        }).catch(err => {
          console.error('复制失败:', err);
          alert('复制失败！请查看控制台获取更多信息。');
        });
      });
    }
  });
});