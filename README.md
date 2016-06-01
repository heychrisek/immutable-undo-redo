# immutable-undo-redo
Reimplementation of simple undo/redo from http://www.macwright.org/2015/05/18/practical-undo.html

Uses immutable data (using [Immutable.js](https://github.com/facebook/immutable-js)), represents history as an immutable list of states, and encapsulates data changes as operations that take a previous state and return a new one.

![undo-redo.gif](http://s33.postimg.org/chsc40xdb/undo_redo.gif)
