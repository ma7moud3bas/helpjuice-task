import { getBlockCopyWithoutOptionsList } from "./helpers";
import { optionsList } from "./constants";
import { updateBlockContent, updateBlockPlaceholder, updateBlockType } from "./storage";
import { checkOptionsListOpen, checkOptionsListOpenable, removeOptionsList, addOptionsList, setOptionsListOpenable, renderBlocks, changeFocusToBlock, renderOptionsList, updateFilterKeyword } from "./ui";

export const handleOptionsList = (e) => {
    const block = getBlockCopyWithoutOptionsList(e.target);
    const content = block.innerHTML;

    const isListOpen = checkOptionsListOpen()
    const isListOpenable = checkOptionsListOpenable()
    const processedContent = content.replaceAll("&nbsp;", " ")

    if (processedContent === "/" && !isListOpen && isListOpenable) {
        addOptionsList(e.target)
    }

    if ((processedContent === "/  " || processedContent.length > 10) && isListOpen) {
        removeOptionsList()
        setOptionsListOpenable(false)
    }

    if (!processedContent.includes("/") && isListOpen) {
        removeOptionsList()
        setOptionsListOpenable(true)
    }

    if (!processedContent.includes("/") && !isListOpen && !isListOpenable) {
        setOptionsListOpenable(true)
    }
    if (isListOpen && processedContent.includes("/")) {
        handleOptionsListFilter(processedContent, e.target)
    }
}

export const selectOption = (block) => {
    const blockIndex = block.getAttribute("data-index")
    const blockOptionsList = document.querySelector("#block-options-list .options")
    const selectedOption = blockOptionsList.querySelector("[data-option-focused='true']")
    const selectedOptionType = selectedOption.getAttribute("data-option-type")
    const placeholder = optionsList[selectedOptionType].title
    updateBlockPlaceholder(blockIndex, placeholder)
    updateBlockContent(blockIndex, "")
    updateBlockType(blockIndex, selectedOptionType)
    renderBlocks()
    changeFocusToBlock(blockIndex, "start")
}

export const handleOptionsListFilter = (content) => {
    const blockOptionsList = document.querySelector("#block-options-list .options")
    renderOptionsList(blockOptionsList, content.replace("/", "").trim())
    updateFilterKeyword(content.replace("/", "").trim())
}

export const handleOptionsListActions = (e) => {
    if (e.key === "Escape") {
        removeOptionsList()
        setOptionsListOpenable(false)
        return
    }
    if (e.key === "ArrowUp") {
        e.preventDefault()
        const blockOptionsList = document.querySelector("#block-options-list .options")
        const selectedOption = blockOptionsList.querySelector("[data-option-focused='true']")
        if (selectedOption.previousElementSibling) {
            selectedOption.previousElementSibling.setAttribute("data-option-focused", "true")
            selectedOption.setAttribute("data-option-focused", "false")
        }
        return
    }
    if (e.key === "ArrowDown") {
        e.preventDefault()
        const blockOptionsList = document.querySelector("#block-options-list .options")
        const selectedOption = blockOptionsList.querySelector("[data-option-focused='true']")
        if (selectedOption.nextElementSibling) {
            selectedOption.nextElementSibling.setAttribute("data-option-focused", "true")
            selectedOption.setAttribute("data-option-focused", "false")
        }
        return
    }
    if (e.key === "Enter") {
        e.preventDefault()
        selectOption(e.target)
        return
    }
}