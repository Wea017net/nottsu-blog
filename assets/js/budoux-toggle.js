import { Parser } from "node_modules/budoux/module/parser.js";
import { model as japaneseModel } from "node_modules/budoux/module/data/models/ja.js";

const parser = new Parser(japaneseModel);
const selectors = ["article h1", ".article-description", ".prose"];
const skippedTags = new Set([
  "CODE",
  "KBD",
  "PRE",
  "SCRIPT",
  "STYLE",
  "TEXTAREA",
]);

const getTextNodes = (element) => {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || skippedTags.has(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );
  const textNodes = [];
  let textNode;

  while ((textNode = walker.nextNode())) {
    textNodes.push(textNode);
  }
  return textNodes;
};

const removeBudouXSeparators = (element) => {
  getTextNodes(element).forEach((textNode) => {
    if (textNode.nodeValue.includes("\u200B")) {
      textNode.nodeValue = textNode.nodeValue.replaceAll("\u200B", "");
    }
  });
};

const applyBudouX = (element) => {
  getTextNodes(element).forEach((textNode) => {
    if (!textNode.nodeValue.trim()) return;
    textNode.nodeValue = parser.parse(textNode.nodeValue).join("\u200B");
  });
  element.style.wordBreak = "keep-all";
  element.style.overflowWrap = "anywhere";
};

const updateBudouX = (enabled) => {
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      removeBudouXSeparators(element);

      if (enabled) {
        applyBudouX(element);
        element.classList.add("budoux-applied");
      } else {
        element.style.removeProperty("word-break");
        element.style.removeProperty("overflow-wrap");
        element.classList.remove("budoux-applied");
      }
    });
  });
};

window.addEventListener("budoux:change", (event) => {
  updateBudouX(event.detail.enabled);
});

// This module is rendered after the article, so apply the default immediately.
const initialEnabled = window.getBudouXEnabled
  ? window.getBudouXEnabled()
  : true;
updateBudouX(initialEnabled);
