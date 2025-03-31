// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'saveAsDocx',
    title: '保存为Word',
    contexts: ['selection']
  });
});

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveAsDocx') {
    chrome.tabs.sendMessage(tab.id, {action: 'getSelectionHtml'}, (response) => {} );
  }
});