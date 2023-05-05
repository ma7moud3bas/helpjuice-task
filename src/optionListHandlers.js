import { checkListOpen, closeList, openList } from "./ui";

export const handleBlockTypeList = (e) => {
    const content = e.target.innerHTML;
    const isListOpen = checkListOpen()
    if (content === "/" && !isListOpen) {
        openList()
    }

    if (content === "/  " || content.length > 5) {
        closeList()
    }

    if (!content.includes("/") && isListOpen) {
        closeList()
    }
}