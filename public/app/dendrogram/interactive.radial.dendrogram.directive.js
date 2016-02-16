(function(){
  angular.module('app')
  .directive('interactiveradialdendrogram', [dendrogram])

  function dendrogram() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="dendrogram"></div>',
      scope: {
        data: '='
      },
      link: drawTreeOfLife,
      controller: 'DendrogramController',
      controllerAs: 'vm',
      bindToController: true
    }
  }


  function drawTreeOfLife($scope, $element, $attr){
    //Inititalization

    //have to put this in here for the time being, need to figure out JSON/XML question
    var life = {
         "name": "chordates",
         "children": [
          {
           "name": "agnatha",
           "children": [
            {
             "name": "jawless fish",
             "children": [
              {"name": "lampreys"},
              {"name": "hagfish"}
             ]
            }
           ]
          },
          {
           "name": "chondrichthyes",
           "children": [
              {"name": "sharks", "size": 1983},
              {"name": "skates", "size": 2047},
              {"name": "rays", "size": 1375}
           ]
          },
          {
           "name": "osteichthyes",
           "children": [
            {
             "name": "actinopterygii",
             "children": [
              {"name": "blue runner", "size": 721},
              {"name": "ocean sun fish", "size": 4294},
              {"name": "oarfish", "size": 9800}
             ]
            },
            {
             "name": "sarcopterygii",
             "children": [
              {"name": "lingfish", "size": 721},
              {"name": "ceolocanths", "size": 4294},
              {"name": "tertrapods", "size": 9800}
             ]
            }
           ]
          },
          {
           "name": "amphibia",
           "children": [
            {"name": "salamanders", "size": 8833},
            {"name": "toads", "size": 1732},
            {"name": "frogs", "size": 3623}
           ]
          },
          {
           "name": "reptilia",
           "children": [
             {"name": "sphendontia",
              "children": [{"name": "Tuataras"}]},
             {
             "name": "testudines", "species": 300,
             "children": [
              {"name": "turtles",
                "children": [
                  {"name": "Alligator Snapping Turtle"},
                  {"name": "Australian Snake-Necked Turtle"},
                  {"name": "Australian Snapping Turtle"},
                  {"name": "Box Turtles"},
                  {"name": "Green Sea Turtle"},
                  {"name": "Hawksbill Sea Turtle"},
                  {"name": "Helmeted Turtle"}
                  ]
                },
              {"name": "tortoises",
              "children": [
                {"name": "African Spurred Tortoise"},
                {"name": "Aldabra Giant Tortoise"},
                {"name": "Asian Brown Tortoise"},
                {"name": "Berlandier's Tortoise"},
                {"name": "Big-Headed Tortoise"},
                {"name": "Bolson Tortoise"}
                ]
              }
             ]
             },
             {
             "name": "crocodylia", "species":23,
             "children": [
              {"name": "crocodiles",
              "children": [
               {"name": "American Crocodile"},
               {"name": "Nile Crocodile"},
               {"name": "Cuban Crocodile"},
               {"name": "Austrailian Saltwater Crocodile"},
               {"name": "Austrailian Freshwater Crocodile"},
               {"name": "Slender-Snouted Crocodile"},
               {"name": "Orinoco Crocodile"}
              ]
              },
              {"name": "gharials",
              "children": [
               {"name": "Gharial"}
              ]
              },
              {"name": "caimans",
              "children": [
               {"name": "Spectacled Caiman"},
               {"name": "Broud-Snouted Caiman"},
               {"name": "Yacare Caiman"},
               {"name": "Black Caiman"},
               {"name": "Cuvier's Dwarf Caiman"},
               {"name": "Smooth-Fronted Caiman"}
              ]
              },
              {"name": "alligators",
              "children": [
               {"name": "American Alligator"},
               {"name": "Chinese Alligator"}
              ]
              }
             ]
             },
             {
               "name": "rhynchocephalia",
             "children": [
              {"name": "didelphimorphia", "size": 593},
              {"name": "paucituberculata", "size": 330},
              {"name": "microbiotheria", "size": 287},
              {"name": "dasyuromorphia", "size": 277},
              {"name": "peramelemorphia", "size": 292},
              {"name": "notoryctemorphia", "size": 595},
              {"name": "diprotodontia ", "size": 594}
             ]
             },
             {
             "name": "squamata", "species":7900,
             "children": [
              {"name": "sauria",
              "children": [
                {"name": "agamidae"},
                {"name": "chamaeleonidae"},
                {"name": "iguanidae"},
                {"name": "gekkonidae"}
              ]

             },
              {"name": "serpentes",
              "children": [
                {"name": "boidae"},
                {"name": "colubridae"},
                {"name": "elapidae"},
                {"name": "hydrophidae"},
                {"name": "pythonidae"},
                {"name": "viperidae"}
                ]
              }
             ]
           }
           ]
          },
          {
           "name": "aves",
           "children": [
             {
             "name": "struthioniformes",
             "children": [
              {"name": "cassowaries", "size": 593},
              {"name": "emus", "size": 330},
              {"name": "kiwis", "size": 287},
              {"name": "ostriches", "size": 277},
              {"name": "rheas", "size": 292}
             ]
             },
             {
             "name": "tinamiformes",
             "children": [
              {"name": "tinamous", "size": 593}
             ]
             },
             {
               "name": "craciformes",
             "children": [
              {"name": "chachalacas", "size": 593},
              {"name": "currasows", "size": 330},
              {"name": "guans", "size": 287},
              {"name": "malleefowl", "size": 277},
              {"name": "scrubfowl", "size": 292}
             ]
             },
             {
             "name": "galliformes",
             "children": [
              {"name": "grouse", "size": 593},
              {"name": "guineafowl", "size": 330},
              {"name": "quails", "size": 330}
             ]
           },
           {
             "name": "anserioformes",
           "children": [
            {"name": "ducks", "size": 593},
            {"name": "geese", "size": 330}
           ]
           },
           {
           "name": "turniciformes",
           "children": [
            {"name": "buttonquails", "size": 593}
           ]
         },
         {
           "name": "piciformes",
         "children": [
          {"name": "barbets", "size": 593},
          {"name": "honeyguides", "size": 330},
          {"name": "piculets", "size": 287},
          {"name": "woodpeckers", "size": 277},
          {"name": "wrynecks", "size": 292}
         ]
         },
         {
         "name": "galbuliformes",
         "children": [
          {"name": "jacamars", "size": 593},
          {"name": "puffbirds", "size": 330}
         ]
        },
        {
        "name": "bucerotiformes", "children": [
         {"name": "hornbills", "size": 593},
         {"name": "other cool birds"}
        ]
        },
        {
          "name": "upupiformes",
        "children": [
         {"name": "hoopoes", "size": 593},
         {"name": "scimitar-bills", "size": 330}
        ]
        },
        {
        "name": "trogoniformes",
        "children": [
         {"name": "trogons", "size": 593}
        ]
        },
        {
        "name": "coraciiformes",
        "children": [
         {"name": "bee-eaters", "size": 593},
         {"name": "kingfishers", "size": 330},
         {"name": "motmots", "size": 330},
         {"name": "rollers", "size": 287},
         {"name": "todies", "size": 277}
        ]
        },
        {
        "name": "coliiformes",
        "children": [
         {"name": "mousebirds or collies", "size": 593}
        ]
        },
        {
        "name": "cuculiformes",
        "children": [
         {"name": "anis", "size": 593},
         {"name": "coucals", "size": 330},
         {"name": "cuckoos", "size": 330},
         {"name": "hoatzin", "size": 287},
         {"name": "road-runners", "size": 277}
        ]
        },
        {
        "name": "psittaciforms",
        "children": [
         {"name": "mawcaws", "size": 593},
         {"name": "parrots", "size": 330}
        ]
        },
        {
        "name": "apodiformes",
        "children": [
         {"name": "swifts", "size": 593}
        ]
        },
        {
        "name": "trochiliformes",
        "children": [
         {"name": "hermits", "size": 593},
         {"name": "hummingbirds", "size": 330}
        ]
        },
        {
        "name": "musophagiformes",
        "children": [
         {"name": "plantain-eaters", "size": 593},
         {"name": "touracos", "size": 330}
        ]
        },
        {
        "name": "strigiformes",
        "children": [
         {"name": "nightjars", "size": 593},
         {"name": "oilbirds", "size": 330},
         {"name": "owls", "size": 330},
         {"name": "owlet-nightjars", "size": 287},
         {"name": "potoos", "size": 277}
        ]
        },
        {
        "name": "columbiformes",
        "children": [
         {"name": "pigeons", "size": 593}
        ]
        },
        {
        "name": "gruiformes",
        "children": [
         {"name": "bustards", "size": 593},
         {"name": "coots", "size": 330},
         {"name": "gallinules", "size": 330},
         {"name": "kagus", "size": 287}
        ]
        },
        {
        "name": "ciconiiformes",
        "children": [
         {"name": "albetrosses", "size": 593},
         {"name": "anhingas", "size": 330},
         {"name": "auks", "size": 330},
         {"name": "bitterns", "size": 287},
         {"name": "boobies", "size": 277}
        ]
        }
        ]
         },
          {
           "name": "mammalia",
           "children": [
            {
             "name": "eutheria",
             "children": [
              {"name": "artiodactyla", "size": 593},
              {"name": "carnivora", "size": 330},
              {"name": "cetecea", "size": 287},
              {"name": "chioptera", "size": 277},
              {"name": "insectivora", "size": 292},
              {"name": "lagomorpha", "size": 595},
              {"name": "macroscelidea", "size": 594},
              {"name": "perissodactyla", "size": 460},
              {"name": "pholidota", "size": 603},
              {"name": "primates", "size": 625},
              {"name": "proboscidea", "size": 748},
              {"name": "rodentia", "size": 461},
              {"name": "sirenia", "size": 597},
              {"name": "tubulidentata", "size": 619},
              {"name": "edentata ", "size": 283},
              {"name": "hyracoidea", "size": 283},
              {"name": "condylarthra (extinct)", "size": 591},
              {"name": "credoanta (extinct)", "size": 603},
              {"name": "desmostylia (extinct)", "size": 599},
              {"name": "embrithopoda (extinct)", "size": 386}
             ]
            },
            {
             "name": "metatheria",
             "children": [
              {"name": "didelphimorphia", "size": 593},
              {"name": "paucituberculata", "size": 330},
              {"name": "microbiotheria", "size": 287},
              {"name": "dasyuromorphia", "size": 277},
              {"name": "peramelemorphia", "size": 292},
              {"name": "notoryctemorphia", "size": 595},
              {"name": "diprotodontia ", "size": 594}
             ]
            },
            {
             "name": "prototheria",
             "children": [
              {"name": "monotremes", "size": 593},
              {"name": "multituberculata (extinct)", "size": 330}
             ]

            }
           ]
          }
         ]
        }

    //tooltip
    // var tooltip = dendrogramService.initializeTooltip()

    //setting diameter variable
    var diameter = 850;

    //convention with d3 seems to be to set margins as well
    var margin = {top: 10, right: 150, bottom: 10, left: 150},
        width = diameter,
        height = diameter;

    //this sets the durations for the transitions when nodes collapse and expand in ms
    var i = 0,
        duration = 750,
        root;

    //this is the where the tree shap is created with size being a fraction of
    //diameter along with the relationships between nodes
    var tree = d3.layout.tree()
        .size([360, diameter / 1-2])
        .separation(function(a, b) { return (a.parent == b.parent*4 ? 1 : 100) / a.depth; });

    //sets the diagonoal projection for the dendrogram
    var diagonal = d3.svg.diagonal.radial()
        .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

    //trying to integrate vz variable structure from Zach's angular + d3 solution
    var svg = d3.select($element[0]).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    //we need to set root equal to a variable, in my working example var life = a
    //big XML of data, need to figure out how to pull this from a JSON
    root = life;

    //sets the position of the primary node
    root.x0 = height / 4;
    root.y0 = 0;

    //start with all children collapsed, if we nix this next line then the graph
    //will start uncollapsed with all nodes
    root.children.forEach(collapse);
    update(root);

  //setting height on the frame of the dendrogram
    d3.select(self.frameElement).style("height", "900");

    //the following modifies the dendrogram using functions declared at the bottom
    //link and node variables are also declared here
    function update(source) {

      //compute the new tree layout
      var nodes = tree.nodes(root),
          links = tree.links(nodes);

      //normalize fixed-depth for each node, magically!
      nodes.forEach(function(d) { d.y = d.depth * 100; });

      //update the nodes  ...
      var node = svg.selectAll("g.node")
          .data(nodes, function (d) {return d.id || (d.id = ++i); });

      //enter any new node at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
          .on("click", click);

      //adding circles to nodes
      nodeEnter.append("circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return d._children ? "orange" : "#fff"; });

      //adding text and setting attributes
      nodeEnter.append("text")
          .attr("x", 10)
          .attr("dy", ".55em")
          .attr("text-anchor", "start")
          .attr("transform", function(d) { return d.x < 180 ? "translate(-6)" : "rotate(360)translate(6)"; })
          // .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "rotate(" + (d.x - 89.95) + ")translate(" + d.y + ")"; })

      nodeUpdate.select("circle")
          .attr("r", 2.5)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
          .style("fill-opacity", 1)
          .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length - 50)  + ")"; });

      // Trying to make appropriate transforms, not perfect
      var nodeExit = node.exit().transition()
          .duration(duration)
          //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
          .remove();
      nodeExit.select("circle")
          .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links between nodes…
      var link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();

      // Stash the old positions for transitions.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

  //functions D3 is using

    // Toggle child nodes on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    // Collapse child nodes on click.
    function collapse(d) {
      if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
            }
    }
  }

})();
