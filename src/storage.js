export const checkStorage = () => {
    return !!localStorage.getItem('blocks');
}

export const setBlocks = (blocks) => {
    localStorage.setItem('blocks', JSON.stringify(blocks));
}

export const updateBlockType = (index, newType) => {
    const blocks = getBlocks();
    blocks[index].type = newType;
    setBlocks(blocks);
}

export const updateBlockPlaceholder = (index, placeholder) => {
    const blocks = getBlocks();
    blocks[index].placeholder = placeholder;
    setBlocks(blocks);
}

export const updateBlockContent = (index, text) => {
    const blocks = getBlocks();
    blocks[index].content = text;
    setBlocks(blocks);
}
export const initializeLocalStorage = () => {
    if (checkStorage()) return;
    setBlocks([
        {
            content: "",
            type: "text"
        }
    ]);
}

export const getBlocks = () => {
    return JSON.parse(localStorage.getItem('blocks'));
}

export const removeBlock = (index) => {
    const blocks = getBlocks();
    blocks.splice(index, 1);
    setBlocks(blocks);
}


export const AddBlock = (index) => {
    const blocks = getBlocks();
    const block = {
        content: "",
        type: "text"
    }
    blocks.splice(index, 0, block);
    setBlocks(blocks);
}

