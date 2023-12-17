import FONT_LIBRARY from "./fontDictionary"
import Data from "./data"

export default class FontSelector 
{
  defaultFallback: string;
  defaultFont: string;
  font: string;

  constructor()
  {
    // definitely want a book font, I think this one looks most suitable for "De Levenssaga"-style
    this.defaultFallback = "georgia";
    this.defaultFont = "gentium" 
    this.font = this.defaultFont;
    this.setup();
  }

  setup()
  {
    this.loadSelectedFont();
    this.setupUI();
  }

  loadSelectedFont()
  {
    let finalFont = (Data.getSelectedFont() || this.defaultFont) || this.defaultFallback;
    const fontIsValid = (finalFont in FONT_LIBRARY);
    if(fontIsValid)
    {
      let fontUniqueURL = FONT_LIBRARY[finalFont];
      let fontURL = "https://fonts.googleapis.com/css2?family=" + fontUniqueURL + "&display=swap";
    
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontURL;
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    const styleClass = "font-" + finalFont;
    document.body.classList.add(styleClass);

    this.font = finalFont;
    Data.setSelectedFont(this.font);
  }

  setupUI()
  {
    const fontBtns = Array.from(document.getElementsByClassName('changeFontBtn')) as HTMLButtonElement[];
    const fontMenu = document.getElementById('font-menu');
    if(!fontMenu) { return console.error("Can't load font picker without UI"); }

    for(const btn of fontBtns)
    {
      btn.addEventListener('click', function(ev) {
        const isVisible = (fontMenu.style.display == 'block');
        if(isVisible)
        {
          fontMenu.style.display = 'none';
          document.body.style.overflow = 'scroll';
        } else {
          fontMenu.style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      })
    }

    const fontSelectors = Array.from(document.getElementsByClassName('font-select-btn')) as HTMLButtonElement[];
    const fontSelectorsById = {};
    for(const btn of fontSelectors)
    {
      fontSelectorsById[btn.name] = btn;

      btn.addEventListener('click', (ev) => {
        Data.setSelectedFont( btn.getAttribute("name") );
        window.location.reload()
      })
    }

    const font = Data.getSelectedFont();
    const fontSelectorButton = fontSelectorsById[font];
    if(!fontSelectorButton) { return console.error("Cannot find button corresponding to selected font (which is " + font + ")"); }
    fontSelectorButton.classList.add("currently-active");
  }
}

