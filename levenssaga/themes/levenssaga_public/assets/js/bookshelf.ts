import ProgressSaver from "./progressSaver"
import Data from "./data"

export default 
{
  containers: {},
  dataNode: null,
  data: null,

  initialize()
  {
    this.setupHTML();
    if(!this.shouldLoad()) { return; }
    this.parse();
    this.load();
  },

  setupHTML()
  {
    this.containers = {
      unread: document.getElementById('stories-unread'),
      progress: document.getElementById('stories-progress'),
      read: document.getElementById('stories-read'),
    }

    this.dataNode = document.getElementById("hidden-bookshelf-metadata");
  },

  shouldLoad() { return this.allHTMLPresent(); },
  allHTMLPresent() 
  {
    return this.containers.unread && this.containers.progress && this.containers.read && this.dataNode;
  },

  parse()
  {
    const children = Array.from(this.dataNode.children) as HTMLSpanElement[];
    const data = {};
    for(const child of children)
    {
      const url = child.dataset.url;
      data[url] = {
        story: child.dataset.story,
        content: child.dataset.content,
        icon: child.dataset.icon,
        timeperiodClass: child.dataset.timeperiod,
      }
    }

    this.data = data;
    console.log(this.data);
  },

  load()
  {
    const numLoadedPerType = { unread: 0, progress: 0, read: 0 }

    for(const url of Object.keys(this.data))
    {
      let item = this.data[url];
      let num = Data.readStoryData(item.story, "num");
      let status = 'unread';
      if(num >= 0) { status = 'progress'; }
      if(num >= 10) { status = 'read'; }

      const cont = this.containers[status];
      const clearLoadingMessage = numLoadedPerType[status] <= 0;
      if(clearLoadingMessage) { cont.innerHTML = ''; }

      numLoadedPerType[status]++;
      this.displaySummary(item, url, cont)
    }

    for(const type of Object.keys(numLoadedPerType))
    {
      if(numLoadedPerType[type] > 0) { continue; }
      this.containers[type].innerHTML = '<em>' + Data.getMetaAttributes().translationEmpty + '</em>';
    }

    ProgressSaver.updateSummaries();
  },

  // Displays a summary block dynamically
  // @RETURN its anchor element (to append more stuff, if wanted)
  // @NOTE: you still need to call updateProgressOnSummaries() after adding all your summaries dynamically
  displaySummary(item, url, container)
  {
    const template = Data.getSummaryTemplate();
    const summaryNode : HTMLElement = template.cloneNode(true) as HTMLElement;
    container.appendChild(summaryNode);
    summaryNode.style.display = "block";

    // @NOTE: for some reason, certain classes are added permanently here (perhaps by another script?), 
    // so we just reset the whole class list to empty and add what we need as a temporary fix
    const timeperiodClass = item.timeperiodClass;
    summaryNode.className = "";
    summaryNode.classList.add("summary");
    summaryNode.classList.add(timeperiodClass);

    const link = summaryNode.getElementsByClassName("neutral-link")[0] as HTMLAnchorElement;
    link.href = url;

    const icons = Array.from(summaryNode.getElementsByClassName("story-icon")) as HTMLImageElement[];
    for(const icon of icons) { icon.src = item.icon; }

    const story = item.story;
    const storyNames = Array.from(summaryNode.getElementsByClassName("story-name")) as HTMLElement[];
    for(const storyName of storyNames) 
    { 
      storyName.innerHTML = story.toUpperCase(); 
      storyName.setAttribute("story-name", story);
    }

    const chapter = item.chapter || story;
    const chapterNames = Array.from(summaryNode.getElementsByClassName("chapter-name")) as HTMLElement[];
    for(const chapterName of chapterNames)
    {
      chapterName.innerHTML = chapter.toUpperCase();
      chapterName.setAttribute("story-name", story);
      //chapterName.setAttribute("chapter-num", item.chapterNum);
    }

    const heading = summaryNode.getElementsByClassName("summary-title")[0];
    heading.innerHTML = chapter;

    let content = item.firstline || item.content;
    if(content == item.firstline) { content += "&hellip;"; }

    const contentNode = summaryNode.getElementsByClassName("summary-blurb")[0];
    contentNode.innerHTML = content;
  }
}
