document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas")
  var undo = document.getElementById("undo")
  var redo = document.getElementById("redo")

  var history = Immutable.fromJS([[]])
  var historyIndex = 0

  function trackHistory(fn, cb) {
    history = history.slice(0, historyIndex + 1)
    var currentState = history.get(historyIndex)
    var newState = fn(currentState)
    history = history.push(newState)
    historyIndex++
    cb && cb()
  }

  function addDot(x, y) {
    trackHistory(function(dots) {
      return dots.push(Immutable.Map({
        x: x, y: y, id: new Date()
      }))
    }, draw)
  }

  function draw() {
    canvas.innerHTML = ""
    dots = history.get(historyIndex)
    dots.forEach(function(dot){
      var elem = canvas.appendChild(document.createElement("div"))
      elem.className = "dot"
      elem.style.left = dot.get("x") + "px"
      elem.style.top = dot.get("y") + "px"
    })
    undo.disabled = (historyIndex != 0) ? "" : "disabled"
    redo.disabled = (historyIndex !== history.size - 1) ? "" : "disabled"
  }

  function undoDot() {
    historyIndex--
    draw()
  }

  function redoDot() {
    historyIndex++
    draw()
  }

  canvas.addEventListener("click", function(e) {
    addDot(e.pageX, e.pageY)
  })

  undo.addEventListener("click", function(e) {
    undoDot()
  })

  redo.addEventListener("click", function(e) {
    redoDot()
  })

  draw()
})