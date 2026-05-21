(() => {
  const shareBlocks = document.querySelectorAll('[data-post-share]');

  shareBlocks.forEach((block) => {
    const shareUrl = block.dataset.shareUrl;
    const shareTitle = block.dataset.shareTitle || document.title;
    const shareText = block.dataset.shareText || `${shareTitle}\n${shareUrl}`;
    const copyButton = block.querySelector('#post-share-copy-btn');
    const copyLabel = block.querySelector('#post-share-copy-label');
    const shareButton = block.querySelector('#post-share-more-btn');

    if (!shareUrl || !copyButton || !copyLabel) {
      return;
    }

    const shareData = {
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    };

    const originalLabel = copyLabel.textContent;
    const originalAriaLabel = copyButton.getAttribute('aria-label') || originalLabel;
    let resetTimer = null;

    const setCopiedState = () => {
      copyLabel.textContent = 'コピーしました';
      copyButton.setAttribute('aria-label', 'リンクをコピーしました');
      if (resetTimer) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        copyLabel.textContent = originalLabel;
        copyButton.setAttribute('aria-label', originalAriaLabel);
      }, 2000);
    };

    const fallbackCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };

    copyButton.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareUrl);
        } else {
          fallbackCopy();
        }
        setCopiedState();
      } catch {
        try {
          fallbackCopy();
          setCopiedState();
        } catch {
          copyButton.setAttribute('aria-label', 'コピーに失敗しました');
        }
      }
    });

    if (shareButton && navigator.share) {
      shareButton.addEventListener('click', async () => {
        try {
          await navigator.share(shareData);
        } catch {
          // 共有メニューのキャンセルは何もしない
        }
      });
    }
  });
})();
