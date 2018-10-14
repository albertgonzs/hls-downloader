import * as R from "ramda";
import { addRequest } from "../modules/requests/action-creators";
import { store } from "../modules/store";
import { changeTab, removeTab } from "../modules/tabs/action-creators";
import { parseFile } from "./Parser";

chrome.webRequest.onBeforeRequest.addListener(
  async function(req) {
    if (req.tabId < 0) {
      return;
    }
    const manifest = await parseFile(req.url);

    if (!R.has("playlists", manifest)) {
      return;
    }

    store.dispatch(addRequest({ ...req, manifest }));
  },
  {
    urls: ["http://*/*.m3u8*", "https://*/*.m3u8*"]
  },
  []
);

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    tabs[0] && store.dispatch(changeTab(tabs[0].id));
  });
});

chrome.windows.onFocusChanged.addListener(windowId => {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    tabs[0] && store.dispatch(changeTab(tabs[0].id));
  });
});

chrome.tabs.onRemoved.addListener(tabId => {
  store.dispatch(removeTab(tabId));
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    store.dispatch(removeTab(tabId));
  }
});
