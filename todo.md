# Essential

These to-dos are next on the list, as soon as possible.

## Metadata

**BUNDLES**: Add sub-folders per _cycle_ for these too, to prevent that folder becoming an unorganized mess over time.

Add more accurate **teaches** to the first several stories. (I often forgot to do this at the start, though many of them do not teach a specific historic event anyway.)

**CHARACTERS:** Create a _page_ for the major characters. (A file in `characters` containing backstory, with the species and other info as YAML metadata.)
* I've already placed a list of characters in the _notes_ of almost all stories.
* Just cut them there and paste them in the unique character pages.
* This would **also help** reduce the number of "one-off" characters and lead to more reuse and connections between stories.

**PAGINATION** for the bookshelf.
* Add simple buttons that modify the URL parameters.
* Read those in JavaScript, use them to determine which part of the full story list to grab.

# Optional / Future

These to-dos are not essential or must wait on future improvements.

**ONCE OFFICIALLY PUBLISHED:** Make the visual side of "this story is not yet available on the website" prettier and clearer.

**ICONS:** Is there _some way_ to display them in larger sizes? Now everything is so small and simple that I'll quickly run out of any meaningful unique visuals.

**SUMMARIES:** 
* At _book_ summaries (not chapter), show the title of the _cycle_ instead. (Instead of just repeating the book title again.)
* Would there also be a place for the _cycle icon_ in that case?

**TOOL:** A page that reads all the years saved in the timeline metadata and puts them in the right order. (So that I don't have to do this by hand anymore.) Uses `yearstart` or the average with `yearend` (if it exists).

**A MUCH BIGGER TOOL:**
* Can I add _data_ (either in the `data` folder, or preferably attached to each story itself) ...
* ... which says things like "this type of thing, with this name, now appears in this spot"
* (optionally with unique types for "areas" and their precise shape, such as continents and countries)
* ... so it can _automatically_ create maps of the world through time
* ... so I can simply scrub backwards and forward to see _exactly_ what stuff looked like in that moment
* Which would allow me to get the most advanced and useful map of a world ever, just by saving a bit more metadata with each story

## AI Translation Experiment

Test the usage of **Seamless-M4T** (or whatever superseded it in the meantime).

* <https://github.com/facebookresearch/seamless_communication>
* Or check out the HuggingFace version.
* They don't use the term _translation_, but **inference**. If you know that, it's easy to read the instructions. (Install Python stuff, provide the right parameters.)
* This can be done _locally_ on the _CPU_, if really needed.
