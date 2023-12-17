#!/bin/bash
hugo --cleanDestinationDir
cd public
rm -f ../ebook.epub
zip -rX ../ebook.epub mimetype oebps META-INF
