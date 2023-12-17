export default {
  key: "levenssagaData",
  publicKey: "LEVENSSAGA_DATA",
  data: null,  

  initialize()
  {
    this.data = JSON.parse(localStorage.getItem(this.key) || "{}");    
    this.makePublic();
  },

  makePublic()
  {
    window[this.publicKey] = this.data;
  },

  save()
  {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  },

  getMetaAttributes()
  {
    const meta = document.getElementById("hidden-javascript-metadata");
    if(!meta) { return {}; }
    return meta.dataset;
  },

  createEntryIfNeededFor(storyName)
  {
    if(storyName in this.data) { return; }
    this.data[storyName] = { num: -1, timesRead: 0 };
    this.save();
  },

  resetStoryData(storyName)
  {
    this.saveStoryData(storyName, "num", 0, true);
  },

  readStoryData(storyName, key) 
  {
    this.createEntryIfNeededFor(storyName);
    return this.data[storyName][key];
  },

  saveStoryData(storyName, key, val, forced = false) 
  {
    this.createEntryIfNeededFor(storyName);

    const onlyKeepMaximum = (!forced && key == "num");
    if(onlyKeepMaximum)
    {
      val = Math.max(this.readStoryData(storyName, key), val);
    }

    this.data[storyName][key] = val;
    this.save();
  },

  getSummaryTemplate()
  {
    return document.getElementById("hidden-summary-template");
  },

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  getTimeperiodDict()
  {
    const colorString = this.getMetaAttributes().timeperiodColors;
    const colorList = colorString.split(" ");
    const colorDict = {};
    for(const elem of colorList)
    {
      const key = elem.split(":")[0];
      const val = elem.split(":")[1];
      colorDict[key] = val;
    }
    return colorDict;
  },

  getTimeperiodColor(timePeriod)
  {
    return this.getTimeperiodDict()[timePeriod];
  },

  getCurrentBook()
  {
    return this.getMetaAttributes().book
  },

  getCurrentChapter()
  {
    return parseInt(this.getMetaAttributes().chapter)
  },

  setSelectedFont(fontName)
  {
    this.data.fontSelected = fontName;
    this.save();
  },

  getSelectedFont()
  {
    return this.data.fontSelected;
  },

  debugEraseAllData()
  {
    localStorage.removeItem(this.key);
  }

}