# How this website works

## General Structure

This is a static website made with **Hugo**.

Its structure is as follows.

At the highest level (in `content`), there's the divide between the two languages (`en` and `nl`). In all languages, however, terms and code are in _English_. The only difference is the actual story content and the outward appearance/translation of elements.

Within each, we have

* `bundle` => contains summaries/descriptions for all bundles. (Their names must match the urlized bundle name.)
* `cycle` => similarly, descriptions for all cycles. (Their names must match the urlized cycle name.)
* `timeperiod` => similarly, descriptions for all timeperiods. (Their names must match the urlized timeperiod name.)
* `search` => the general search page. (Merely provides the search box and styles; PageFind automatically does the rest.)
* `bookshelf` => the page that generates and displays your personal bookshelf.
* `translatehelp` => a tool I use for checking word counts, referenced terms, readability, etcetera.
* `oebps` => contains the ACTUAL STORIES

And a few miscellaneous standalone articles to explain the website and project to visitors.

## Saga Structure

As for the actual stories (in `oebps`), their structure is as follows.

* Books
  * Cycle Name
    * Book Name
      * Chapters in Book (`chapter-1` ... `chapter-10`)
      * `notes` => any notes, remarks, extra info about this story
      * `print` => helper page to display/download a nice printable version of the story

Each layer must have an `_index.md` file, so that it's considered a _section_ and you can visit that specific layer on its own. (Actual articles/chapters themselves are always just `somename.md` files.)

It's a lot of folders and files, but the strict hierarchy will be extremely beneficial as the saga grows.

There's also the `backup` folder that houses old versions of stories that needed a huge rewrite. This should never be used and will be cleaned once in a while.

And an `unpublished` folder that contains (mostly) finished stories that I simply haven't given their proper place in the Saga yet. Most likely because I wrote them when I was very young and they're just not good enough at the moment.

This folder also contains an _empty template_ to copy-paste when starting a new story (in Dutch).

## Individual Stories

Chapters and books are sorted by _date ascending_. (The earlier the data, the earlier the book.)

The only exception is the front page, which shows the latest stories first.

Each book has metadata:

* `weight` = where this book sits _within its cycle_. (So the fifth book of a cycle has weight 5.)
* `uniqueID` = the ID used to link the different translations of each story. Usually the name of the story, lowercase, spaces replaced by hyphens (`-`).
* `timeperiod` = one of the ten time periods of the saga.
* `bundle` = the name of its bundle. A bundle always combines two stories, with a fun identifier for each and an ampersand (`&`) between them.
* `characters` = a list of all (important) characters in the story.
* `genre` = a list of genres or tags related to the story.
* `prequel` = any stories you might want to read before reading this one
* `refers` = all major things the story _mentions_ or _refers to_. (Usually a very long list.)
* `happens` = all major events that _happen_ in this story. (Usually a very short list.)
* `godlink` = some character or item related to the original godchildren; each story must have one
* `blurb` = the short description (you'd otherwise find at at the back of a book, for example) shown in summaries
* `timeline` = rough indication of the year a story starts and finishes
* `readability` = word counts and readability score for the book (as spit out by `translatehelp`)

The actual content of its `_index.md` page is the little poem at the start of each story. 

## Design

The website has two _themes_:

* `levenssaga_public` => this is the actual public website with all its styles and logic, and thus the default
* `epub` => if this is turned on, building the website creates an epub instead. (In the `config.toml` file, I can select which exact stories I want to bundle and which I want to ignore.)

@TODO: The `epub` theme will probably be removed. It is faster and easier to just copy-paste the stories and use some Pandoc commands to generate an epub, than maintain this unwieldy website-to-epub approach for the entire thing.

### Fonts

This is how to add a new font (that readers can choose themselves for the entire website):

- Partial `site-font-select.html` => add the button to pick this font
- JS `font_selector.ts` => add its URL to Google Fonts
- SASS `modules/_fonts.scss` => add the font name and optional properties (such as a unique line-height)

In the future, perhaps automate this process more.

### Bookshelf

Hugo automatically builds an element that contains the metadata for all stories. This is a hidden element at the bottom of the page, generated automatically, so nothing to do here.

It combines this with your saved data (books unread, read, reading) in `localStorage` to display each book's status.

### Search

This is taken care of by the amazing PageFind. After building the website, run `npx pagefind --source public` and it automatically indexes the updated website.

### Unpublished Stories

If a story is done (and perhaps can be purchased), but should not be available yet, add the following to the frontmatter.

```
draft: true
locked: true
cascade:
    _target:
        kind: page
```

@TODO: I think this changed at some point, and it's a bad system anyway (should be automated).

### Media

This website is 99% text, with a few images for the general design and layout/marketing.

The only other images are for each _story_: an icon and (in the future) book cover.

* Make the original drawings in `.png`. The EPUB will need it.
* But convert to `.webp` and use that on the website itself, as it has a far smaller file size.

## Epub Theme

### How do I change this?

- Inside the theme folder, there's a `stylesheet.css` file for the visual styles.
- The `single.html` file determines the look and content of the individual chapters AND the table of contents.
- The `section.html` file is for the first/overview page of books (with the poem and anything else I might want to add)

### How to create the epub?

* Switch `config.toml` to the contents of `config_epub.toml`
* (Optional: add the files from the `content_epub` folder to the root of `content`.)
* In `config.toml`, change the `ignoreFiles` property to contain only the exact titles of stories you DO want in your epub.
* Open a command line, go to the website folder, type `hugo` and press Enter.
* Now, everything inside the `public` folder is the content of your epub. Zip that, change the extension to `.epub`

### Other Notes

There are several files in which we practically execute the same _double loop_ (through books => chapters in each book):

* `index.opf` => must register all files and media that are inside the ebook, including ID and order. (If one misses, or is attributed wrongly, it fails.)
* `index.ncx` => generates the navigation/hierarchy that ereaders can use to make the book easy to traverse.
* `single.xhtml` => generates the HTML for the _table of contents_. (For EPUB 3, this can be used for navigation too, and so it's marked like that.)

**Lesson Learned:** a list in a list is achieved by adding the second list _inside_ the `<li>` element.

**Lesson Learned:** `_index.md` turns its folder into a section. `.Section` generally returns only the _root section_. 

If you want another, you can grab it with `site.GetPages <url>`. You'll have it for sure _and_ you can loop through all direct children with `.Pages`. If you want to loop through ALL pages, including further subsections, use `.RecursivePages`.

**Lesson Learned:** You can do a lot with the `config.toml`.

* `ignoreFiles` = a _regex_ to not export entire parts of the website.
* `disableKinds` = disable an entire class of pages easily.
* `permalinks` = rewrite the complete URLs for the entire website. (Dangerous too.)