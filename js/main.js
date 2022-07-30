var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

console.log(
  "%cSierra Industries",
  "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%c(ValorZephos)", "color: grey");

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(admin, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("AUTHORIZED_USER@SIERRA:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "HELP":
      loopLines(HELP, "color2 margin", 80);
      break;
    case "INFORMATION":
      loopLines(INFORMATION, "color2 margin", 80);
      break;
    case "BACKGROUND":
      loopLines(BACKGROUND, "color2 margin", 80);
      break;
    case "CLASSIFICATIONS":
      loopLines(CLASSIFICATIONS, "color2 margin", 80);
      break;
    case "DEPARTMENTS":
      loopLines(DEPARTMENTS, "color2 margin", 80);
      break;
    case "CLEARANCES":
      loopLines(CLEARANCES, "color2 margin", 80);
      break;
    case "ARCHIVES":
      loopLines(ARCHIVES, "color2 margin", 80);
      break;
    case "OPERATIONS":
      loopLines(OPERATIONS, "color2 margin", 80);
      break;
    case "FACILITY":
      loopLines(FACILITY, "color2 margin", 80);
      break;
    case "VIRUS":
      loopLines(VIRUS, "color2 margin", 80);
      break;
    case "ADMINISTRATIVE":
      liner.classList.add("password");
      pw = true;
      break;
    case "HISTORY":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "CLEAR":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      loopLines(banner, "", 80);
      break;
    case "BANNER":
      loopLines(banner, "", 80);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}
