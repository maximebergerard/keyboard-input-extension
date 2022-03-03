let eventMatchers = {
  'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}

let defaultOptions = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true
}

if (window == top) {
  window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
}

function doKeyPress(e) {
  switch (e.keyCode) {
    case 67:
      const items = document.querySelectorAll(".choose-collective-farm__farms__card")
      for (let i = 0; i < items.length; i++) {
        if (items[i].innerText.includes("Black")) {
          simulate(items[i].querySelector("button"), "click")
        }
      }
      console.log("Choosing BlackTurtle farm")
      break;
    case 86:
      simulate(document.querySelector(".choose-duck__ducks__card"), "click")
      console.log("Picking first duck")
      break;
    case 65:
    case 81:
      simulate(document.getElementsByClassName("Hand_cards__2EyGR")[0].children[0], "click")
      console.log("Picking first card")
      randomizeActionButton()
      break;
    case 90:
    case 87:
      simulate(document.getElementsByClassName("Hand_cards__2EyGR")[0].children[1], "click")
      console.log("Picking second card")
      randomizeActionButton()
      break;
    case 69:
      simulate(document.getElementsByClassName("Hand_cards__2EyGR")[0].children[2], "click")
      console.log("Picking third card")
      randomizeActionButton()
      break;
    // case 103:
    //   simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[0].children[0], "click")
    //   console.log("First defense button")
    //   break;
    // case 100:
    //   simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[0].children[1], "click")
    //   console.log("Second defense button")
    //   break;
    // case 97:
    //   simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[0].children[2], "click")
    //   console.log("Third defense button")
    //   break;
    // case 105:
    //   simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[1].children[0], "click")
    //   console.log("First attack button")
    //   break;
    // case 102:
    //   simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[1].children[1], "click")
    //   console.log("Second attack button")
    //   break;
    // case 99:
    //   simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[1].children[2], "click")
    //   console.log("Third attack button")
    //   break;
    case 13:
      simulate(document.querySelector(".Gameplay_makeTurn__mGBeP"), "click")
      console.log("Action button")
      break;
    case 8:
      simulate(document.querySelector(".FarmCard_action__1EucH"), "click")
      console.log("Back button")
      break;
    default:
      console.log(e.keyCode)
      break;
  }
}

function extend(destination, source) {
  for (let property in source)
    destination[property] = source[property];
  return destination;
}

function simulate(element, eventName) {
  let options = extend(defaultOptions, arguments[2] || {});
  let oEvent, eventType = null;

  for (let name in eventMatchers) {
    if (eventMatchers[name].test(eventName)) { eventType = name; break; }
  }

  if (!eventType)
    throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

  if (document.createEvent) {
    oEvent = document.createEvent(eventType);
    if (eventType == 'HTMLEvents') {
      oEvent.initEvent(eventName, options.bubbles, options.cancelable);
    }
    else {
      oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
        options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
        options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
    }
    element.dispatchEvent(oEvent);
  }
  else {
    options.clientX = options.pointerX;
    options.clientY = options.pointerY;
    let evt = document.createEventObject();
    oEvent = extend(evt, options);
    element.fireEvent('on' + eventName, oEvent);
  }
  return element;
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function randomizeActionButton() {
  let attArray = [0, 1, 2];
  let defArray = [0, 1, 2];

  attArray = shuffle(attArray);
  defArray = shuffle(defArray);

  const defPoint = parseInt(document.getElementsByClassName("TargetPoints_count__1QWDl")[0].innerText)
  const attPoint = parseInt(document.getElementsByClassName("TargetPoints_count__1QWDl")[1].innerText)

  // def actions
  for (let i = 0; i < defPoint; i++) {
    simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[0].children[defArray[i]], "click")
  }

  // att actions
  for (let i = 0; i < attPoint; i++) {
    simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[1].children[attArray[i]], "click")
  }

  simulate(document.querySelector(".Gameplay_makeTurn__mGBeP"), "click")

}