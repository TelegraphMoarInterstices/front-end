# Twig of Life
A tiny little piece of the great Tree of Life, made manifest on the internet through the twin powers of Angular and D3.

## Wireframes
### Main view - logged in user
![Wireframe](/wireframes/twig-of-life-wireframe-1.png)

Users first see an initial rendering of the dendrogram. Is it all the nodes? Only three levels deep? To be decided.

Users can filter the nodes by several properties, for instance: Habitat, Body mass, and Diet. The exact properties will be determined by what is available on the data set.

When  user clicks the "Bookmark" button, the current filtered view is saved to the database. They have the option to name/describe the view. If they don't describe the view, the system will auto generate a description for them.

Note: only the selected properties need to be saved, not the entire dendrogram data set. So a bookmark might look like this:

```
{
  "description": "Koala-like critters",
  "characterstics":
    {
      "habitat": ["temperate forest", "woodlands"],
      "body-mass": [4, 15], // A range in kilograms
      "diet": "eucalyptus leaves"
    },
  "date-created": "1455474834000"
}
```

### Bookmarks view - logged in user
![Wireframe](/wireframes/twig-of-life-wireframe-2.png)

The user can see (and delete) their previously bookmarked views.

Maybe they can also update the description?

## About
This is the front end for the tree of life visualization project. See the repositories for the rest of the code [here](https://github.com/TelegraphMoarInterstices).

## Deployed
[At this place](https://twig-of-life.firebaseapp.com/).

## To run this on your machine
First, do this to install Angular and D3:

```
$ bower install
```

Then go into the public folder and run a local server:

```
$ cd public
$ http-server
```
