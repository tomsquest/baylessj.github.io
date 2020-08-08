---
title: 
---

While I had posted [before]()  about how I felt that I had found the ideal tooling for my [Zettelkasten]() in [VimWiki](), I hit some growing pains with the toolset as I continued to add to my notes. When my notes were fairly small it made a lot of sense to keep all of the notes in one, large document, but that got to be difficult to work with. My Zettelkasten is still far from huge compared to the examples of others on the internet; it is around 250 unique notes at the time of writing. I bounced around to a couple other tools when I decided to move away from VimWiki and I am happily (for now, I suppose) using [Foam]().

## Attempts to scale VimWiki

I don't intend to imply that I jumped ship from VimWiki as soon as editing my notes became the slightest bit difficult, quite the opposite in fact. I prefer using Vim for most of my text editing needs so staying in Vim to edit my notes reduced the resistance for switching mental modes to taking notes from my usual code writing. I found two additions to my VimWiki workflow that made editing easier.

The first addition was isn't a dedicated tool, really, but was a new addition to my Vim skills. I learned more about folding sections in Vim and set up my config to indent VimWiki headers. This allowed me to reduce the visual clutter of the many notes in the wiki file. This created a new problem, though, because I used the first line or two of each note as a way of determining what it was about when adding backlinks. This meant that I had to constantly fold and unfold notes, defeating most of the approach's benefits.

The second addition was an [excellent plugin]() for Vim that allowed me to view the VimWiki headers in a standard ctags sidebar. This made it possible to see the hierarchy of notes based on their Zettelkasten tags in a simple viewer. This had the same issue as the folding addition, though, in that I couldn't see the description when trying to make links between documents. It was an improvement but I still struggled to find the right place to add new notes and to find existing notes when creating links.

## Restructuring to one file per note

It became pretty clear that the recommended folder structure for a Zettelkasten in most tools is to use one markdown file for each note. This adds a bit more of a clear hierarchical structure to the notes than Luhman seemed to recommend in his personal Zettelkasten, but I actually have found this structure to be an improvement. The consensus seems to be a bit split on file naming, whether to use descriptive names or just the Zettelkasten identifier. I chose to put both in the file name, and so far it has made for a nice balance of easy discoverability of the note's topic and conciseness [sic?]. The recommended structure for [Dendron]() used one large root folder and dots to indicate the document hierarchy. I found this large folder to have many of the same shortcomings that the single VimWiki had, it was hard to navigate. The nested folder structure gave me the ability to easily find notes and only see the notes that I was concerned with.

## Obsidian 

## Dendron 

## Foam

