import { handleBlockInput, handleBlockKeyDown } from "./blockHandlers";
import { optionsList } from "./constants";
import { getBlocks } from "./storage";

import TextTIcon from "./assets/text-t-bold.svg"

export const renderBlocks = () => {
    const blocks = getBlocks();
    const container = document.getElementById('blocks-container');
    // remove all child nodes that have the class list-block
    container.querySelectorAll('.list-block').forEach((block) => {
        block.remove();
    });

    blocks.forEach((block, index) => {
        renderBlock(block, index, container);
    });
}

export const renderBlock = (block, index, container) => {
    const div = document.createElement('div');
    div.setAttribute('data-index', index);
    div.setAttribute('contenteditable', true);
    div.setAttribute('data-type', block.type);
    div.setAttribute('placeholder', block.placeholder || "Type / for blocks, @ to link docs or people");
    div.className = "list-block relative w-full border-none outline-none focus:outline-none py-1"
    div.innerHTML = block.content;
    div.addEventListener('input', handleBlockInput);
    div.addEventListener('keydown', handleBlockKeyDown);
    container.appendChild(div);
}

export const changeFocusToBlock = (index, caretPosition) => {
    const block = document.querySelector(`[data-index="${index}"]`);
    block.focus();
    // set caret to the end of the block
    const range = document.createRange();
    const selection = window.getSelection();
    if (caretPosition === "start") {
        range.selectNodeContents(block);
        range.collapse(true);
    } else if (caretPosition === "end") {
        range.selectNodeContents(block);
        range.collapse(false);
    }
    selection.removeAllRanges();
    selection.addRange(range);
}

export const checkOptionsListOpen = () => {
    return !!document.getElementById('block-options-list');
}

export const checkOptionsListOpenable = () => {
    const container = document.getElementById("blocks-container");
    return container.getAttribute('data-list-openable') === "true";
}
export const setOptionsListOpenable = (openable) => {
    const container = document.getElementById("blocks-container");
    container.setAttribute('data-list-openable', openable);
}

export const addOptionsList = (block) => {
    const list = document.createElement('div');
    list.id = "block-options-list";
    list.setAttribute('data-list-open', true);
    list.setAttribute('contenteditable', false);

    list.className = "absolute top-[calc(100%+3px)] z-50 w-80 bg-white shadow-xl rounded flex flex-col py-4 border border-gray-100 min-h-[300px]"
    list.innerHTML = `
            <div class="flex flex-col  px-3">
              <span class="font-bold">Add blocks</span>
              <span class="text-sm text-brand-light-gray">keep typing to filter, or escape to exit </span>
              <div id="filter-keyword-container" class="flex gap-x-2 mt-3 text-brand-dark-gray">
                <span class="text-sm ">Filtering keyword</span>
                <span class="text-sm bg-brand-blue rounded px-1 text-white min-w-[15px] font-normal" id="filter-keyword"></span>
              </div>
            </div>
            <div class="options mt-1 flex-1 h-full">
            </div>
    `
    const filter = block.innerHTML.replace("/", "")
    const optionsList = list.querySelector('.options')
    renderOptionsList(optionsList, filter);
    block.prepend(list);
}

export const renderOptionsList = (list, filter) => {
    const filteredOptionsList = Object.values(optionsList).filter((option) => {
        return option.title.toLowerCase().includes(filter.toLowerCase()) || option.type.toLowerCase().includes(filter.toLowerCase());
    })
    list.innerHTML = "";
    if (filteredOptionsList.length === 0) {
        list.innerHTML = `
            <div class="w-full h-full py-1.5 flex items-center justify-center gap-x-3 mt-12">
                <div class="flex flex-col gap-y-0.5 items-center justify-center">
                <span class="text-sm font-bold text-brand-dark">No matches found</span>
                <span class="text-xs text-brand-light-gray">Try a different keyword</span>
                </div>
            </div>
        `
        return;
    }
    Object.values(filteredOptionsList).forEach((option, index) => {
        list.innerHTML += `
            <div data-option-type="${option.type}" data-option-focused="${index === 0}" tabIndex="1" class="w-full p-1.5 flex items-center gap-x-3">
                <img class="h-7 w-7" src=${TextTIcon} alt="text t icon" />
                <div class="flex flex-col gap-y-0.5">
                <span class="text-sm font-bold text-brand-dark">${option.title}</span>
                <span class="text-xs text-brand-light-gray">Shortcut: ${option.type}</span> 
                </div>
            </div>
            `
    })

}

export const updateFilterKeyword = (keyword) => {
    const filterKeyword = document.getElementById('filter-keyword');
    filterKeyword.innerText = keyword;
}

export const removeOptionsList = () => {
    const list = document.getElementById('block-options-list');
    list.parentElement.removeChild(list);
}
