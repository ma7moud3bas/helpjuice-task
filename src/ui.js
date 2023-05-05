import { handleBlockChange, handleBlockInput, handleBlockKeyDown } from "./blockHandlers";
import { getBlocks } from "./storage";

export const renderBlocks = () => {
    const blocks = getBlocks();
    const container = document.getElementById('blocks-container');
    container.innerHTML = '';
    blocks.forEach((block, index) => {
        renderBlock(block, index, container);
    });
}

export const renderBlock = (block, index, container) => {
    const div = document.createElement('div');
    div.classList.add('block');
    div.setAttribute('data-index', index);
    div.setAttribute('contenteditable', true);
    div.setAttribute('data-type', block.type);
    div.setAttribute('placeholder', "Type / for blocks, @ to link docs or people");
    div.className = "block w-full border-none outline-none focus:outline-none py-1"
    div.innerHTML = block.content;
    div.addEventListener('input', handleBlockInput);
    div.addEventListener('change', handleBlockChange);
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

export const checkListOpen = () => {
}

export const openList = () => {

}

export const closeList = () => { }

