let myFont;
let jing, poop, scoop;
let fishX = 600;
let fishY = 500;
let okButton, closeButton, ytlink;
let secretButton;
let showThing = false;
let stuffInd = -1;

let poopCoords = [];
let view = "instructions";
let stuff = ["being obsessed with jobros and that one music video with the security guard riding on squirrels", "obsessively playing clash of clans & that clan fb group you were in with randos of all walks of life", "sexual awakenings with bryden fanfics - that academy one especially -hot-", "[you as didi on msn messenger] >> you. me. movies. tuesday. [didis crush] >> what?", "penny thinking she could jump onto the highest shelf ever and causing a catastrophe + dirt everywhere", "ahsan descending as a spider from the ceiling", "kyle langan escapades (where is he now?)", "patrick hrbovsky", "when your mom and I agreed to never tell you how scary your vagina looked right after birth", "bitch wall: kimia and bitchkita (and the other one you know who)"];

function preload() {
  myFont = loadFont('assets/VT323.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  jing = loadImage("assets/jing-tr.png");
  poop = loadImage("assets/poop4.png");
  scoop = loadImage("assets/scoop2.png");
  penny = loadImage("assets/penny-crop.png");
  birdie = loadImage("assets/birdie-crop.png");
  templeton = loadImage("assets/templeton-crop.png");
  
  for(let i = 0; i < stuff.length; i++) {
    const xSide = random(["left", "right"]);
    const ySide = random(["up", "down"]);
    
    const xLower = xSide === "left" ? 50 : windowWidth/2 + 200;
    const xHigher = xSide === "left" ? windowWidth/2 - 200 : windowWidth - 50;
    const yLower = ySide === "up" ? 50 : windowHeight / 2 + 70;
    const yHigher = ySide === "up" ? windowHeight/2 - 100 : windowHeight - 50;
    const phoneX = random(xLower, xHigher);
    const phoneY = random(yLower, yHigher);
    const rot = random(20);
    poopCoords.push({x: phoneX, y: phoneY, rot});
  }
  textFont(myFont);
  textSize(36);
  okButton = createButton("ok");
  okButton.position(290,485);
  okButton.mousePressed(() => {
    view = "play";
    okButton.hide();
  });
  closeButton = createButton("x");
  closeButton.position(windowWidth/2 + 420, windowHeight/2);
  //windowWidth/2, windowHeight/2, 410, 250
  closeButton.mousePressed(() => {
    showThing = false;
    closeButton.hide();
  });
  closeButton.hide();
  secretButton = createButton("continue");
  secretButton.position(200, 590);
  secretButton.mousePressed(() => {
    view = "note";
    secretButton.hide();
  });
  secretButton.hide();
  ytlink = createA('https://www.youtube.com/watch?v=VAljIQPbmAk', 'click here for a surprise', "_blank");
  ytlink.position(windowWidth - 300, windowHeight - 100);
  ytlink.hide();
}

function draw() {
  if(view === "note") {
    closeButton.hide();
    background(220);
    push();
    translate(-300,-300);
    textSize(36);
    text("happy birthday jing!!!! you are my soul sister and I'm so so so so so so grateful to have you in my life. we have seen each other through so many awkward, painful, hilarious, and joyful experiences in life, and I know we will see each other through many more. wouldn't have it any other way! here's to friendships aging like fine wine! I know it's been a hard year for you, but I'm so proud of you for being the absolute graceful and strong person you are. how lucky are daniel and andres to have such a great momma in the family! ok I hope this game was funny and not annoying LOL love you lots xoxo -boo", windowWidth /2 - 100, windowHeight/2, 700, 700);
  ytlink.show();
  translate(-75, -85);
  image(jing, fishX, fishY, 100, 200);
    pop();
  } else {
  background("#ffdeed");
  push()
  translate(-75, -85);
  image(jing, fishX, fishY, 100, 200);
  pop();
  image(scoop, fishX - 130, fishY + 60, 80, 80);
    
  for(let i = 0; i < poopCoords.length; i++) {
    const {x, y, rot} = poopCoords[i];
    push();
    translate(x, y);
    rotate(rot);
    image(poop, 0, 0, 80, 25);
    pop();
  }  
    
  
if(view === "instructions") {
  push();
  fill(255);
  rect(85, 100, 410, 465);
  pop();
  text("the cats have pooped all over the place! and conveniently everyone has disappeared from the apartment, leaving just you and the pooper scooper. press wasd to move, press enter to pick up the poops", 100, 125, 400, 500);
}
if(view === "complete") {
  push();
  fill(255);
  rect(85, 185, 410, 465);
  pop();
  text("congratulations, you scooped all the poop. conveniently, everyone has just returned to the apartment and the cats have come out of hiding.", 100, 200, 400, 500);
  image(penny, 100, 500, 60, 60);
  image(birdie, 200, 500, 60, 60);
  image(templeton, 300, 500, 60, 60);
}
  
  if(showThing) {
    fill("#f2f786");
    stroke("#670da3");
    rect(windowWidth/2, windowHeight/2, 410, 250);
    fill("#f5571d");
    text("you found a memory!", windowWidth/2, windowHeight/2 - 10);
    fill("#24ad11");
    text(stuff[stuffInd], windowWidth/2 + 10, windowHeight/2 + 10, 380, 240);
  }
  }
  
   if (keyIsDown(65)) {
    fishX -= 5;
  }

  if (keyIsDown(68)) {
    fishX += 5;
  }

  if (keyIsDown(87)) {
    fishY -= 5;
  }

  if (keyIsDown(83)) {
    fishY += 5;
  }

}

function keyPressed() {
  if(keyCode === ENTER) {
    for(let i = 0; i < poopCoords.length; i++) {
      const {x, y} = poopCoords[i];
      if(Math.abs(x - fishX) < 100 && Math.abs(y - fishY) < 150) {
        const first = poopCoords.slice(0, i);
        const second = poopCoords.slice(i + 1, poopCoords.length)
        poopCoords = first.concat(second);
        showThing = true;
        closeButton.show();
        stuffInd +=1;
        
        if(poopCoords.length === 0) {
          view = "complete";
          secretButton.show();
        }
        break;
      }
    }
  }
}