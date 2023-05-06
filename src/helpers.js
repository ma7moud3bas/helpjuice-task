export const getBlockCopyWithoutOptionsList = (block) => {
    const newBlock = block.cloneNode(true)
    const blockHasOptionsList = newBlock.querySelector("#block-options-list")
    if (blockHasOptionsList) {
        newBlock.removeChild(blockHasOptionsList)
    }
    return newBlock
}