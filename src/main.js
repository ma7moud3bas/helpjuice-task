import './styles/index.css'
import { initializeLocalStorage } from './storage'
import { renderBlocks } from './ui'
import { addHandlerToBlockContainer } from './blockHandlers';
const runApp = () => {
    initializeLocalStorage();
    renderBlocks();
    addHandlerToBlockContainer()
}

runApp();