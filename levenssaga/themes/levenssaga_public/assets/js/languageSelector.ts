export default class LanguagePicker {
  constructor()
  {
    this.setup();
  }

  setup()
  {
    const languageBtns = Array.from(document.getElementsByClassName('changeLanguageBtn'));
    const languageMenu = document.getElementById('language-picker');
    if(!languageMenu) { return console.error("Can't load language picker without UI"); }

    for(const btn of languageBtns)
    {
      btn.addEventListener('click', (ev) => {
        const isVisible = (languageMenu.style.display == 'block');
        if(isVisible)
        {
          languageMenu.style.display = 'none';
          document.body.style.overflow = 'scroll';
        } else {
          languageMenu.style.display = 'block';
          document.body.style.overflow = 'hidden';
        } 
      })
    }
  }
}

