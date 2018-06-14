### Watch and Run

Very simple script that will restart whatever command you pass it when a file
changes in the current directory (note: it's recursive)

This is a very rough implementation and simply uses Node's built in `fs.watch`
method on top of its `child_process.spawn` method.

How to use:

`node ./watch.js [command]`

Will update this in my free time.
