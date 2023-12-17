import Data from "./data"

export default {
  initialize()
  {
    this.setupStoryButtons();
    this.setupChapterButtons();
    this.setupScrollListener();
    this.updateSummaries();
  },

  setupStoryButtons()
  {
    const startReadBtn = document.getElementById('start-read-btn');
    const continueReadBtn = document.getElementById('continue-read-btn');
    if(!startReadBtn || !continueReadBtn) { return; }
  
    startReadBtn.addEventListener("click", (ev) => {
      Data.resetStoryData(Data.getCurrentBook());
      const link = Data.getMetaAttributes()["linkChapter-1"];
      window.location.href = link;
    });
  
    let lastChapter = Data.readStoryData(Data.getCurrentBook(), "num");
    const nonChapterPage = lastChapter < 0 || lastChapter >= 10
    if(nonChapterPage) { continueReadBtn.style.display = 'none'; }
  
    continueReadBtn.addEventListener("click", (ev) => {
      const link = Data.getMetaAttributes()["linkChapter-" + lastChapter];
      window.location.href = link;
    });
  },

  setupChapterButtons()
  {
    const prevChapterBtn = document.getElementById('prev-chapter');
    const nextChapterBtn = document.getElementById('next-chapter');

    if(nextChapterBtn)
    {
      nextChapterBtn.addEventListener("click", (ev) => {
        Data.saveStoryData(Data.getCurrentBook(), "num", Data.getCurrentChapter());
      });
    }
  },

  setupScrollListener()
  {
    const readerContainer = document.getElementsByClassName("reader")[0];
    if(!readerContainer) { return; }

    window.addEventListener('scroll', (ev) => {
        const rect = readerContainer.getBoundingClientRect();

        const curBook = Data.getCurrentBook();
        const curChapter = Data.getCurrentChapter();
        if(!curBook || curChapter <= 0) { return; }

        // not "completely", it's like 95%, just to be sure
        let completelyScrolledThroughStory = (window.scrollY + window.innerHeight) >= (rect.bottom - rect.top);
        if (!completelyScrolledThroughStory) { return; }

        // to prevent calling this hundreds of times per second
        if(Data.readStoryData(curBook, "num") >= curChapter) { return; } 
        
        Data.saveStoryData(curBook, "num", curChapter);
        console.log("PROGRESS SAVER: Saved chapter as read!");
    });
  },

  updateSummaries()
  {
    const dynamicDataElems = Array.from(document.getElementsByClassName('dynamic-read-data'));
    for(const elem of dynamicDataElems)
    {
      const story = elem.getAttribute("story-name") || "";
      const chapter = elem.getAttribute("chapter-num") || -1;
  
      const isStory = (chapter == -1);
      const data = Data.readStoryData(story, "num");
      let text = isStory ? this.humanReadableStoryNum(data) : this.humanReadableChapterNum(chapter, data)
      elem.innerHTML = text.toUpperCase();
    }
  },

  // for loading data on how far you've read stuff
  humanReadableStoryNum(num)
  {
    const meta = Data.getMetaAttributes();
    if(num < 0) { return meta.translationUnread; }
    else if(num == 0) { return meta.translationReading; }
    else if(num == 10) { return meta.translationRead; }
    else { return meta.translationProgress + num; }
  },

  humanReadableChapterNum(myNum, savedNum)
  {
    const meta = Data.getMetaAttributes();
    if(myNum > savedNum) { return meta.translationUnread; }
    return meta.translationRead;
  }
}