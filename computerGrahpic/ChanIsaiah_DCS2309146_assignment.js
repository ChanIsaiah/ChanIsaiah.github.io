var shape1;
var shape2;
var color1;
var color2;

function preload(){
	img = loadImage("logo.png");
	}
	
function setup() {
	createCanvas(800, 600);
	background(20, 20, 100);
	noStroke();
	shape1 = new semiCircle(150, 0, 0, 0, 1, 'shape1', color1);
	shape2 = new semiCircle(150, 0, 0, 180, -1, 'shape2', color2);
	angleMode(DEGREES);
	
	color1 = fill(255, 0, 159);
	color2 = fill(0, 223, 255);
}

function draw() {
	background(20, 20, 100);
	push();
	translate(width/2, height/2);
	shape1.drawShape();
	shape2.drawShape();
	shape1.move();
	shape2.move();
	pop();
	image(img,700,500,100,100);
}

class semiCircle {
	constructor (size, x, y, arc, rotate, id, color) {
		this.size = size;
		this.position = createVector(x, y);
		this.angle = 0;
		this.arc = arc;
		this.rotate = rotate;
		this.id = id;
		this.color = color;
		this.x2 = 0;
		
	}
	
	drawShape() {
		push();
		rotate(this.angle * -this.rotate);
		
		if (this.id == 'shape1') {
			fill(255, 0, 159);
			arc(0, 0, 600 + this.x2, 600 + this.x2, 0, this.angle);
			arc(0, 0, 600 + this.x2, 600 + this.x2, 180, 180 + this.angle);
		}
		
		else if (this.id == 'shape2') {
			fill(0, 223, 255);
			push();
			rotate(-this.angle);
			arc(0, 0, 600 + this.x2, 600 + this.x2, 0, this.angle);
			arc(0, 0, 600 + this.x2, 600 + this.x2, 180, 180 + this.angle);
			pop();
			}
		
		//big semi circle
		if (this.id == 'shape2') {fill(255, 0, 159);}
		else if (this.id == 'shape1') {fill(0, 223, 255);}
		
		arc(this.position.x, this.position.y, this.size*2, this.size*2, this.arc + 0, this.arc + 180);
		arc(-this.position.x, -this.position.y, this.size*2, this.size*2, this.arc + 180, this.arc + 360);
		
		
		//small semi circle
		if (this.id == 'shape1') {fill(255, 0, 159);}
		else if (this.id == 'shape2') {fill(0, 223, 255);}
		
		arc(this.position.x, this.position.y, this.size, this.size, this.arc + 0, this.arc + 180);
		arc(-this.position.x, -this.position.y, this.size, this.size, this.arc + 180, this.arc + 360);
		pop();
		
		
	}
	
	move() {
		if (this.position.x > this.size) {this.position.x = this.size;}
		else if (this.angle > 90) {this.angle = 90;}
		
		else if (this.angle == 90) {
			if (this.position.x > 0) {
				//circle go back to starting position
				this.position.x -= 5;
				if (this.position.x < 0) {this.position.x = 0;}
				
				//increase the background circle size
				this.x2 += 20;
				}
				
			else if (this.position.x == 0) {
				//reset
				this.angle = 0;
				this.x2 = 0;
				}
		}
		else if (this.position.x == this.size) {
			this.angle += 5;
		}
		else if (this.position.x < this.size) {
			this.position.x += 5;
		}
	}
	
}