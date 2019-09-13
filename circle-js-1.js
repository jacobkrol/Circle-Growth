
window.onload = function() {
	canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
	canv.width = $(window).width()-21;
	canv.height = $(window).height()-21;
	globalDeclarations();
	var fps = 25;
	setInterval(main, 1000/fps);
}

window.onresize = function() {
	canv.width = $(window).width()-21;
	canv.height = $(window).height()-21;
	wiper.stop();
}

function globalDeclarations() {
	background = "#444";
	cpal = [
		"#F00","#FF8000","#FF0","#80FF00","#0F0","#00FF80",
		"#0FF","#0080FF","#00F","#8000FF","#F0F","#FF0080"
	];
	circles = [];
	live = 0;
	pen = new Pen(50,50);
	f = 1e99; // frame number
	wiper = new Wiper();
	wiper.stop();
}

function Wiper() {
	this.on = false;
	this.t = 0;

	this.start = function() {
		this.on = true;
		this.t = 0;
		this.method = Math.floor(Math.random()*4);
	}
	this.stop = function() {
		ctx.fillStyle = background;
		ctx.fillRect(0,0,canv.width,canv.height);
		this.on = false;
	}
	this.clean = function() {
		switch(this.method) {
				case 0:
					this.wipe();
					break;
				case 1:
					this.cells();
					break;
				case 2:
					this.pie();
					break;
				case 3:
					this.blots();
					console.log("blots");
					break;
				default:
					this.stop();
					break;
			}
	}
	this.wipe = function() {
		ctx.fillStyle = background;
		if(this.t < canv.width) {
			this.t += 20;
			ctx.fillRect(0,0,this.t,canv.height);
		} else {
			this.stop();
		}
	}
	this.cells = function() {
		ctx.fillStyle = background;
		var n = 10,
			sizey = canv.height/n,
			sizex = canv.width/n;
		if (this.t < 2*n*n) {
			this.t++;
			var x = Math.floor(Math.random()*n)*sizex,
				y = Math.floor(Math.random()*n)*sizey;
			ctx.fillRect(x,y,sizex+1,sizey+1);
		} else {
			this.stop();
		}
	}
	this.pie = function() {
		ctx.fillStyle = background;
		var w = canv.width,
			h = canv.height,
			r = Math.sqrt( Math.pow(w,2) + Math.pow(h,2) );
		if( this.t < 2*Math.PI ) {
			this.t += Math.PI/8;
			ctx.beginPath();
			ctx.moveTo(w/2,h/2);
			ctx.arc(w/2,h/2,r,-Math.PI/2,this.t-Math.PI/2);
			ctx.lineTo(w/2,h/2);
			ctx.fill();
		} else {
			this.stop();
		}
	}
	this.blots = function() {
		ctx.fillStyle = background;
		if(this.t < circles.length) {
			var dots = [
				circles[circles.length-this.t],
				circles[circles.length-this.t-1],
				circles[circles.length-this.t-2] ];
			this.t += 3;
			for(dot of dots) {
				if(dot) {
					ctx.beginPath();
					ctx.arc(dot.x,dot.y,dot.r+1,0,2*Math.PI);
					ctx.fill();
				}
			}
		} else {
			this.stop();
		}
	}
	this.stripes = function() {
		ctx.strokeStyle = "red";
		var n = 15,
			diag = Math.sqrt(Math.pow(canv.width,2)+Math.pow(canv.height,2)),
			wid = diag/n;
		if(this.t < 2*n*n) {
			var loc = Math.floor(Math.random()*n),
				dir = Math.floor(Math.random()*2),
				ang = Math.atan(canv.height/canv.width);
			ctx.beginPath();
			ctx.lineWidth = wid;

			ctx.moveTo(diag*Math.cos(ang)*(loc/n),0); //canv.height-diag*Math.sin(ang)*(loc/n)-canv.height);
			var hyp = (wid/2) / Math.cos(Math.PI/2 - ang);
			var err = {
				x: (Math.PI/2-ang)
			}; //amount to cover corners of strok gap
			ctx.lineTo(diag*Math.cos(ang)*(loc/n),canv.height);
			ctx.stroke();
			if(dir==0) {

			}
		} else {
			this.stop();
		}
	}
}

function Pen(x,y) {
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.speed = 40;
	this.color = cpal[Math.floor(Math.random()*cpal.length)];

	this.move = function() {
		//shift angle
		var limit = Math.PI/4,
			change = Math.random()*2*limit - limit;
		this.angle += change;
		this.x += this.speed*Math.cos(this.angle);
		this.y += this.speed*Math.sin(this.angle);

		//adjust for bounds
		// if(this.x < 0) { this.x = canv.width; }
		// if(this.x > canv.width) { this.x = 0; }
		// if(this.y < 0) { this.y = canv.height; }
		// if(this.y > canv.height) { this.y = 0; }

		//shift color
		var index = cpal.indexOf(this.color)+1;
		if(index > cpal.length-1) { index = 0; }
		this.color = cpal[index];
	}
}

function Circle(x,y,c) {
	this.x = x;
	this.y = y;
	this.r = 0;
	this.color = c;

	this.grow = function() {
		this.r += 0.5;
	}
	this.intersect = function(other) {
		try {
			var dist = Math.sqrt( Math.pow(this.x-other.x,2) + Math.pow(this.y-other.y,2) );
			var altdist =
			Math.sqrt( Math.pow(this.x-other.x,2) + Math.pow(this.y-other.y,2) )
			var rsum = this.r + other.r;
			return dist <= rsum;
		} catch {
			return false;
		}
	}
}

function fillCircle( c ) {
	ctx.fillStyle = c.color;
	// if(c.color == "#0080FF") { console.log(c.color); }
	if(!c.color) { console.log(c.color); }
	ctx.beginPath();
	ctx.arc(c.x%canv.width+canv.width*(c.x<0), c.y%canv.height+canv.height*(c.y<0), c.r, 0, 2*Math.PI);
	ctx.fill();
}

function handleWipe() {
	var covered = Math.PI*Math.pow(circles[Math.floor(circles.length/2)].r,2)*circles.length,
		paletteSize = canv.width * canv.height,
		saturation = 4;
	if( covered > saturation*paletteSize ) {
		if(!wiper.on) {
			wiper.start();
		} else {
			wiper.clean();
		}
		if(!wiper.on) {
			circles = [];
			live = 0;
		}
	}
}

function main() {

	//add new circle
	var rate = 2;
	if( ++f >= rate && !wiper.on ) {
		pen.move();
		circles.push( new Circle(pen.x, pen.y, pen.color) );
		f = Math.floor(Math.random()*(rate/2));
	}

	//draw circles
	for(var i=0; i<circles.length && !wiper.on; ++i) {
		var c = circles[i];
		if( c.intersect(circles[i-2]) || c.intersect(circles[i+2]) ) {
			// c.grow();
		} else {
			c.grow();
		}
		fillCircle(c);
	}

	//wipe
	if(circles.length) {
		handleWipe();
	}

}
