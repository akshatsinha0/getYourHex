chrome.action.onClicked.addListener(async tab=>{
  if(!tab||!tab.id)return;
  await chrome.scripting.executeScript({target:{tabId:tab.id},files:["contentScript.js"]});
  await chrome.tabs.sendMessage(tab.id,{t:"TOGGLE"});
});
chrome.runtime.onMessage.addListener((m,s,send)=>{
  if(m&&m.t==="CAPTURE"){
    chrome.tabs.captureVisibleTab(s.tab.windowId,{format:"png"},url=>send({ok:true,url}));
    return true;
  }
});

//hello