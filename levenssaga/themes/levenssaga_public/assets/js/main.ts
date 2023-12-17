import Data from "./data"
import FontSelector from "./fontSelector"
import LanguagePicker from "./languageSelector"
import Navigation from "./navigation"
import ProgressSaver from "./progressSaver"
import Bookshelf from "./bookshelf"

window.addEventListener("load", () => {
    Data.initialize();
    ProgressSaver.initialize();
    Bookshelf.initialize();

    const fontSelector = new FontSelector();
    const languagePicker = new LanguagePicker();
    const navButtons = new Navigation();
})