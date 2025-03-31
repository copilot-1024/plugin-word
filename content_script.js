// 监听来自背景脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectionHtml') {
    (async () => {
      const range = document.getSelection().getRangeAt(0);
      const htmlContent = new XMLSerializer().serializeToString(range.cloneContents());
      try {
        const docxContent = await htmlToDocx(htmlContent);
        const blob = new Blob([docxContent], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        console.log('blob：', blob);
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'selected_content.docx';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // 释放Blob URL资源
        window.URL.revokeObjectURL(a.href);
        sendResponse({success: true});
      } catch (error) {
        console.error('Error converting to docx:', error);
        sendResponse({success: false, error: error.message});
      }
    })();
    return true;
  }
});