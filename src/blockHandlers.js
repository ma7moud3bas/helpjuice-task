import { getBlockCopyWithoutOptionsList } from "./helpers";
import { handleOptionsList, handleOptionsListActions, handleOptionsListFilter } from "./optionListHandlers";
import { AddBlock, getBlocks, removeBlock, setBlocks } from "./storage";
import { changeFocusToBlock, checkOptionsListOpen, renderBlocks } from "./ui";

export const handleBlockInput = (e) => {
    // this logic makes sure that the block doesn't have any empty divs, brs or nbsp and doesn't have any unnecessary nodes
    const index = e.target.getAttribute('data-index');
    const blocks = getBlocks();
    const block = getBlockCopyWithoutOptionsList(e.target)

    if (["<br>", "&nbsp;", "<div><br></div><div><br></div>", "<br><br>"].includes(block.innerHTML)) {
        block.innerHTML = ""
    }

    let text = block.innerHTML
    text = text.replace(/<div>/g, "<br>").replace(/<\/div>/g, "").replace(/<i><br><\/i>/g, "<br>").replace(/<u><br><\/u>/g, "<br>").replace(/<b><br><\/b>/g, "<br>")
    while (text.endsWith("<br>")) text = text.slice(0, -4)
    while (text.match(/<br><br><br>/g)) text = text.replace(/<br><br><br>/g, "<br><br>")

    block.innerHTML = text
    blocks[index].content = text;
    setBlocks(blocks);
    handleOptionsList(e);
}

const handleArrowUp = (e, index, caretPosition) => {
    if (e.key === "Up" || e.key === "ArrowUp") {
        if (e.shiftKey) {
            return
        }
        if (caretPosition === 0) {
            e.preventDefault();
            changeFocusToBlock(index - 1 >= 0 ? index - 1 : 0, "end");
        }
    }
}

const handleArrowDown = (e, index, blocks, caretPosition) => {
    const block = blocks[index];
    if (e.key === "Down" || e.key === "ArrowDown") {
        if (e.shiftKey) {
            return
        }
        if (caretPosition === block.content.length) {
            e.preventDefault();
            changeFocusToBlock(index + 1 < blocks.length ? index + 1 : blocks.length, "start");
        }
    }
}

const handleEnter = (e, index, caretPosition) => {
    if (e.shiftKey || e.key !== "Enter") {
        return
    }
    // check if the caret is at the end of the block
    const blockLength = e.target.innerHTML.length;
    if (caretPosition === blockLength) {
        e.preventDefault()
        AddBlock(index + 1);
        renderBlocks();
        changeFocusToBlock(index + 1, "start");
    }
}

const handleBackspace = (e, index, blocks) => {
    const block = blocks[index];
    if (e.key === 'Backspace' && block.content === "" && blocks.length > 1) {
        e.preventDefault();
        removeBlock(index);
        renderBlocks();
        changeFocusToBlock(index - 1 >= 0 ? index - 1 : 0, "end");
    }
}

export const handleBlockKeyDown = (e) => {
    const index = parseInt(e.target.getAttribute('data-index'));
    const blocks = getBlocks();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const caretPosition = range.startOffset;
    if (!checkOptionsListOpen()) {
        handleArrowUp(e, index, caretPosition);
        handleArrowDown(e, index, blocks, caretPosition);
        handleEnter(e, index, caretPosition);
    } else if (["Enter", "ArrowUp", "ArrowDown", "Escape"].includes(e.key)) {
        handleOptionsListActions(e);
    }
    handleBackspace(e, index, blocks);
}

export const addHandlerToBlockContainer = () => {
    const container = document.getElementById('blocks-container');
    // add event listener to add new block when user clicks on the container
    container.addEventListener('click', (e) => {
        if (e.target.id !== 'blocks-container') {
            return
        }
        const blocks = getBlocks();
        const lastBlock = blocks[blocks.length - 1];
        if (lastBlock.content !== "") {
            AddBlock(blocks.length);
            renderBlocks();
            changeFocusToBlock(blocks.length, "start");
        }
    });
}
