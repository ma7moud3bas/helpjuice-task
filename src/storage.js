export const checkStorage = () => {
    return !!localStorage.getItem('blocks');
}

export const initializeLocalStorage = () => {
    if (checkStorage()) return;
    localStorage.setItem('blocks', JSON.stringify([
        {
            content: "",
            type: "text"
        }
    ]));
}

export const getBlocks = () => {
    return JSON.parse(localStorage.getItem('blocks'));
}

export const removeBlock = (index) => {
    const blocks = getBlocks();
    blocks.splice(index, 1);
    localStorage.setItem('blocks', JSON.stringify(blocks));
}


export const AddBlock = (index) => {
    const blocks = getBlocks();
    const block = {
        content: "",
        type: "text"
    }
    blocks.splice(index, 0, block);
    localStorage.setItem('blocks', JSON.stringify(blocks));
}

