let fish = [];
let specialFish = [];
let score = 0;
let hook = { x: 0, y: 0, width: 10, height: 30, speed: 5, isThrown: false, returning: false };
let thrower;
let limit = 3;
let limitsc = Math.round(limit/2)-1;
let long = 0;
let m = 0;
let n = 0;
let message = '';
let gold = '';
let limits = '';
let depths = '';
let limt = '';
let dept = '';
let messageTimer;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
let bgm;
let bgmPlaying = false;
let canvas;

function preload() {
    img1 = loadImage('background.jpg');
    img2 = loadImage('fish1.png');
    img3 = loadImage('fisherman.png');
    img4 = loadImage('hook.png');
    img5 = loadImage('increaseLimit.png');
    img6 = loadImage('specialFish.png'); 
    img7 = loadImage('increaseDepth.png');
    img8 = loadImage('fishing.png');
    bgm = loadSound('Carefree.mp3');
}

function setup() {
    canvas = createCanvas(1280, 720);
    gold = 'Gold: ' + score;
    limits = 'Limit for normal fish= ' + limit;
    limtspc = 'Limit for special fish= ' + limitsc;
    depths = 'Depth= ' + (400 + long) + ' meters';
    limt = 'Next upgrade need ' + (20 + n) + ' golds';
    dept= 'Next upgrade need ' + (20 + m) + ' golds';
    spawnFish();
    spawnSpecialFish();
    thrower = { x: 460, y: 140, width: 200, height: 100 };

    let button = createButton('');
    button.position(10, 10);
    button.size(170, 50);
    button.style('background-image', 'url(increaseLimit.png)');
    button.style('background-size', 'cover');
    button.mousePressed(increaseLimit);

    button = createButton('');
    button.position(10, 70);
    button.size(170, 50);
    button.style('background-image', 'url(increaseDepth.png)');
    button.style('background-size', 'cover');
    button.mousePressed(increaseDepth);

    button = createButton('');
    button.position(10, 130);
    button.size(170, 50);
    button.style('background-image', 'url(fishing.png)');
    button.style('background-size', 'cover');
    button.mousePressed(tonforfish);
    canvas.mousePressed(startBGM);
}

function startBGM() {
    if (!bgmPlaying) {
        bgm.loop();
        bgmPlaying = true;
    }
}

function draw() {
    background(img1);
    line(thrower.x + 182, thrower.y + 54, hook.x, hook.y);
    image(img4, hook.x, hook.y, hook.width, hook.height);

    for (let i = fish.length - 1; i >= 0; i--) {
    fish[i].update();
    fish[i].display();
         for (let i = fish.length - 1; i >= 0; i--) {
            if (fish[i].caught == true) {caught += 1}
	    }
        if (catching(fish[i])) {
			if (caught < limit) {
				fish[i].caught = true;
			}
        }
		if (getcoin(fish[i])){
			fish.splice(i, 1);
            score++;
			gold = 'Gold: ' + score;
		}
		
		caught = 0;
    }
	
	for (let i = specialFish.length - 1; i >= 0; i--) {
        specialFish[i].update();
        specialFish[i].display();
		for (let i = specialFish.length - 1; i >= 0; i--) {
			if (specialFish[i].caught == true) {caught += 1}
		}
        if (catching(specialFish[i])) {
			if (caught < (limit/2)-1) {
				specialFish[i].caught = true;
			}
        }
		if (getcoin(specialFish[i])){
			specialFish.splice(i, 1);
            score += 5; // Earn 5 points for catching special fish
			gold = 'Gold: ' + score;
		}
		
		caught = 0;
    }
    image(img3, thrower.x, thrower.y, thrower.width, thrower.height);

    if (hook.isThrown) {
        if (!hook.returning) {
            hook.y += hook.speed;
            if (hook.y >= 400 + long) {
                hook.returning = true;
            }
        } else {
            hook.y -= hook.speed;
            hook.x = mouseX - hook.width / 2; 
            if (hook.y <= thrower.y) {
                hook.isThrown = false;
                hook.returning = false;
                hook.y = thrower.y + 40;
                hook.x = (thrower.x + thrower.width - hook.width / 2) - 15;
            }
        }
    } else {
		
        hook.x = (thrower.x + thrower.width - hook.width / 2) - 15;
        hook.y = thrower.y + 50;
    }

    fill(255, 255, 0);
    textSize(30);
    text(gold, 1100, 50);
    
    fill(255, 0, 0);
    textSize(30);
    text(message, 200, 160);
    
    fill(0);
    textSize(30);
    text(limits, 600, 40);
    
    fill(0);
    textSize(30);
    text(limtspc, 600, 100);
	
    fill(0);
    textSize(30);
    text(depths, 630, 160);
	
    fill(255, 0, 255);
    textSize(30);
    text(limt, 200, 40);
	
    fill(255, 0, 255);
    textSize(30);
    text(dept, 200, 100);
	
    checkFishCounts();
}

class Fish {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.caught = false;
    }

    display() {
        image(img2, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (this.y > height) {
            this.y = 400;
            this.x = random(width);
        }
        
        if (this.x < 0) {
            this.x = width;
        }
        
        if (this.caught == true && hook.returning) {
            this.x = hook.x;
            this.y = hook.y;
        }
    }
}

class SpecialFish extends Fish {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
    }

    display() {
        image(img6, this.x, this.y, this.width, this.height); 
    }
}

function spawnFish() {
    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(300, 500);
        let fishWidth = 50;
        let fishHeight = 20;
        let speed = random(1, 3);
        fish.push(new Fish(x, y, fishWidth, fishHeight, speed));
    }
}

function spawnSpecialFish() {
    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(400, 700);
        let fishWidth = 50;
        let fishHeight = 20;
        let speed = random(1, 3);
        specialFish.push(new SpecialFish(x, y, fishWidth, fishHeight, speed));
    }
}

function catching(fish) {
    return (
        hook.x < fish.x + fish.width &&
        hook.x + hook.width > fish.x &&
        hook.y < fish.y + fish.height &&
        hook.y + hook.height > fish.y
    );
}

function getcoin(fish) {
    return (
        fish.y <= 270
    );
}

function keyPressed() {
    if (keyCode === 32) { 
        tonforfish();
    }
    if (key === 'q' || key === 'Q') {
        increaseLimit();
    }
    if (key === 'a' || key === 'A') {
        increaseDepth();
    }
}

function tonforfish(){
	if (!hook.isThrown) {
            hook.isThrown = true;
        }
}

function increaseLimit() {
    if (score >= 20 + n) {
        score -= 20 + n;
        limit++;
	limitsc = Math.round(limit/2)-1;
        n += 10;
        message = 'Limit increased to ' + limit;
        gold = 'Gold: ' + score;
        limits = 'Limit for normal fish= ' + limit;
	limtspc = 'Limit for special fish= ' + limitsc;
	limt = 'Next upgrade need ' + (20 + n) + ' golds';
    } else {
        message = 'Not enough golds!!';
    }
    clearTimeout(messageTimer); 
    messageTimer = setTimeout(() => {
        message = '';
    }, 2000); 
}

function increaseDepth() {
    if (score >= 20 + m) {
        score -= 20 + m;
        m += 10;
        long += 10;
        message = 'Depth increased to ' + (400 + long) + ' meters';
        gold = 'Gold: ' + score;
        depths = 'Depth= ' + (400 + long) + ' meters';
	dept= 'Next upgrade need ' + (20 + m) + ' golds';
    } else {
        message = 'Not enough golds!!';
    }
    clearTimeout(messageTimer); 
    messageTimer = setTimeout(() => {
        message = '';
    }, 2000); 
}

function checkFishCounts() {
    if (fish.length <= 40) {
        spawnFish();
    }
    if (specialFish.length <= 20) {
        spawnSpecialFish();
    }
}
