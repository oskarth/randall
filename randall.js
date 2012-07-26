// TODO head should be connected to neck (invisible edge?)
// TODO make Stickman() object! function Stickfigure () { this.graph = [[]].., prototypes
// TODO ability to move body 50px to right
// TODO add a knee (and rewrite edges)
// TODO parameter object instead of n[x]? (var opts = {width: 400, ...}; opts.width;)
//
// PARAMETER OBJECT?
// var graph = {x: myx, y: myy, neighbors: [arr], circle: true} ... how change?
//
// COMPACTNESS
// m = [[20,20,[1,2,3]],[20,27,[4,5]],[15,15],[25,15],[15,32],[25,32],[20,17,0,2]]; // 80 chars
// huffman encoding? copy-pastable?
// "say it with a stickman" animations with arrays of stickfiguresand delays
// 
// IDEA: whole-body scaling and twisting
// IDEA: bring back defaults
// IDEA: grid layout, circle layout to denote movability around central nodes
// IDEA: use standard body proportions to generate diff body types
//
// OPERATIONS
// moving a foot means preserving distance, ie keep circle, ie change direction from connected node
// and then move along it from the one-neighbor
// circles good way of illustrating though, at least around torsos
//
// NOW?
// leg = limb(0, 1) lets say this is true, leg evals to the actual limb, we can find out its length
// then we want to start at connected one (WHY? - we are moving the foot, right?)
// moveFoot so direction is ssw. Does that make sense?
// ... "move foot ssw wrt to torso" ... is wrt torso implicit? why? if I have a knee?
// muddled when it comes to left/up and stuff
// what about clockwise and counterclockwise? % or so
// make distinction between noForce move and Force move (later)
// heres where the limb thing comes into play.
// leg(ssw) [assuming there is a ]
// 
// ALIASES
// nodes = chest, pelvis, head, {left|right}{hand|foot}
// ... (neck, {left|right}{knee|elbow})
//
// edges leftleg = [pelvis, leftfoot] etc
// 
// ...which level of abstraction is this? where do we do this?
// "naming things" - we want to have a bunch of default aliases,
// but we also want to be able to add to it
// should be able to use natural language from the get-go,
// but add a weird joint if need arises
//
// not part of the CORE though, since that is just points, lines and arcs
// this is one level above that
//
// move([leftfoot, pelvis], deg)
// implicitly rotate leftfoot around pelvis in degree. Check for other connections!



// A graph is a list of nodes
// [x, y, [edgeIndices]*, radius**]
// * index to connected nodes ** implicitly a circus
// TODO variable
graph = [[200, 200, [1, 2, 3]],
         [200, 270, [4, 5]],
         [140, 170],
         [260, 170],
         [150, 320],
         [250, 320],
         [200, 175, null, 20]];

function moveEdge(g, a, b, deg) {
  // start from b,
  // keep len(a, b),
  // calc new a with deg,
  // replace a
  // should error if problem
  //g[b]
  // ...kind of assumes a and b are neighbors etc. find out if case!?
}

// NOT USED: Proof of concept, moves whole graph 
function moveGraph(g, dx, dy) {
  return _.map(g, function(n) {
    n[0] = n[0] + dx;
    n[1] = n[1] + dy;
  });
}

// Main function to draw figure
function draw () {
  var ctx = document.getElementById("scene").getContext("2d");

 function drawNode(n) {
    ctx.fillStyle = (n[3]) ? "black" : "rgb(10,200,10)";
    ctx.beginPath();
    ctx.arc(n[0], n[1], 4, 0, 2*Math.PI);
    ctx.fill();
  }

  function drawEdge(a, b) {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  }

  function drawCircle (n) {
    ctx.beginPath();
    ctx.arc(n[0], n[1], n[3], 0, 2*Math.PI*n[3], false);
    ctx.stroke();
  }

  // Draws nodes, circles and edges starting at node
  _.each(graph,
      function(n) {
        drawNode(n); // n[0] and n[1]
        _.each(n[2],
          function(k) { 
            drawEdge(n, graph[k]);
          });
        if (n[3]) {
          drawCircle(n);
        }
      });
}
