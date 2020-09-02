# trains-directed-graph

## Running the app.

```
Dependencies:

node: >= v12.18.3
typescript: >= 4.0.2
```

In order to run this package, first run `npm install` from the root directory.

After this, run `npm run test` in order to run the test files.

In order to custom input, update the graph.txt.

    1. The first line is an the graph route as csv.
    1. The next n lines are routes which you can find the distance of.

And run `npm run start`

## Overview

The goal here was to showcase my abilities with both Object Oriented Programming and the idiosyncrasies of typescript. My process was to build from the ground up. I started with the Vertex class, then wrote the edges, and finally the graph with unit testing along the way.

I found the more intense search segment somewhat difficult, and appreicated the challenge. I made a point to not try any canned algorithms, and attempted to make it my own.

One assumption that I note in the codebase is that any length of walk can be taken, but that when checking for walks of a certain minimum distance, it is logical to assume that these walks would not be overly long. Thus I used n=10 steps.
