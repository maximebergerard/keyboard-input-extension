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
      simulate(document.querySelector(".ChooseFarm_action__24Yme"), "click")
      console.log("Choosing a farm")
      break;
    case 86:
      const items = document.querySelectorAll(".FarmCard_root__31mb0")
      for (let i = 0; i < items.length; i++) {
        if (items[i].innerText.includes("Mathematical")) {
          simulate(items[i].querySelector(".FarmCard_action__1EucH"), "click")
        }
      }
      console.log("Choosing mathematical farm")
      break;
    case 66:
      simulate(document.querySelector(".TournamentAside_play__1KCGN"), "click")
      console.log("Playing")
      break;
    case 78:
      simulate(document.querySelector(".DuckList_duck__bg__XO3mi"), "click")
      console.log("Picking first duck")
      break;
    case 188:
      simulate(document.querySelector(".recaptcha-checkbox-checkmark"), "click")
      console.log("Clicking captcha")
      break;
    case 65:
      simulate(document.getElementsByClassName("Hand_cards__2EyGR")[0].children[0], "click")
      console.log("Picking first card")
      break;
    case 90:
      simulate(document.getElementsByClassName("Hand_cards__2EyGR")[0].children[1], "click")
      console.log("Picking second card")
      break;
    case 69:
      simulate(document.getElementsByClassName("Hand_cards__2EyGR")[0].children[2], "click")
      console.log("Picking third card")
      break;
    case 103:
      simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[0].children[0], "click")
      console.log("First defense button")
      break;
    case 100:
      simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[0].children[1], "click")
      console.log("Second defense button")
      break;
    case 97:
      simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[0].children[2], "click")
      console.log("Third defense button")
      break;
    case 105:
      simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[1].children[0], "click")
      console.log("First attack button")
      break;
    case 102:
      simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[1].children[1], "click")
      console.log("Second attack button")
      break;
    case 99:
      simulate(document.getElementsByClassName("TargetPoints_targets__2Bq1I")[1].children[2], "click")
      console.log("Third attack button")
      break;
    case 13:
      simulate(document.querySelector(".Gameplay_makeTurn__mGBeP"), "click")
      console.log("Action button")
      break;
    case 16:
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

simulate(document.getElementsByClassName("Hand_cards__2EyGR")[0].children[0], "click")