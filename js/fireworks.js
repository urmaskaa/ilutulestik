$(function(){
	
	var params = location.search;
    var message = "";
    if (params.match('msg=')) {
        message = unescape(params.split('?msg=')[1]);
    }
	else{
		message = "Head uut aastat 2018";
        
	}
	
	$('h1').html(message);
	$('title').html(message);
	
	var fw1 = new Audio("js/fw1.mp3");
	var fw2 = new Audio("js/fw2.mp3");
	var fw3 = new Audio("js/fw3.mp3");
	var fw4 = new Audio("js/fw4.mp3");
	var fw5 = new Audio("js/fw5.mp3");
	var fe1 = new Audio("js/fe1.mp3");
	var fe2 = new Audio("js/fe2.mp3");
	var fe3 = new Audio("js/fe3.mp3");
	var fe4 = new Audio("js/fe4.mp3");
	var fe5 = new Audio("js/fe5.mp3");
	var fe6 = new Audio("js/fe6.mp3");
	var fe7 = new Audio("js/fe7.mp3");
	var fe8 = new Audio("js/fe8.mp3");
	var c1 = new Audio("js/c1.wav");
	var c2 = new Audio("js/c2.wav");
	/*=============================================================================*/	
	/* FPS Tracker
	/*=============================================================================*/
	var stats = new Stats();
	stats.getDomElement().style.position = 'absolute';
	stats.getDomElement().style.right = '250px';
	stats.getDomElement().style.top = '0px';				
	document.body.appendChild( stats.getDomElement() );

	var Fireworks = function(partCount, partSpeed, partWind, partFriction, partGravity, flickerDensity, multi, hueMin, hueMax, hueVariance){
//		console.log(partCount);
		this.partCount = partCount;
		this.partSpeed = partSpeed;
		this.partWind = partWind;
		this.partFriction = partFriction;
		this.partGravity = partGravity;
		this.flickerDensity = flickerDensity;
		this.hueMin = hueMin;
		this.hueMax = hueMax;
		this.hueVariance = hueVariance;
		/*=============================================================================*/	
		/* Utility
		/*=============================================================================*/
		var self = this;
		var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
		var hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
		window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
		
		/*=============================================================================*/	
		/* Initialize					partcount
		/*=============================================================================*/
		self.init = function(){
			self.canvas = document.createElement('canvas');				
			self.canvas.width = self.cw = $(window).innerWidth();
			self.canvas.height = self.ch = $(window).innerHeight();			
			self.particles = [];	
			self.fireworks = [];	
			self.mx = self.cw/2;
			self.my = self.ch/2;
			self.currentHue = 30;
//			self.partSpeed = 5;
			self.partSpeedVariance = 10;
//			self.partWind = 50;
//			self.partFriction = 5;
//			self.partGravity = 1;
//			self.hueMin = 0;
//			self.hueMax = 360;
			self.fworkSpeed = 4;
			self.fworkAccel = 10;
//			self.hueVariance = 30;
//			self.flickerDensity = 25;
			self.showShockwave = false;
			self.showTarget = false;
			self.clearAlpha = 5;
	
			$(document.body).append(self.canvas);
			self.ctx = self.canvas.getContext('2d');
			self.ctx.lineCap = 'round';
			self.ctx.lineJoin = 'round';
			self.lineWidth = 1;
			self.bindEvents();			
			self.canvasLoop();
			var myFunction = function() {
				
			self.partSpeedVariance =Math.round(Math.random() * 25);

			self.fworkSpeed = Math.round(Math.random() * 10);
			self.fworkAccel = Math.round(Math.random() * 10);			
				var x = Math.round(Math.random() * self.cw);
				var y = Math.round(Math.random() * self.ch);
				self.createFireworks(self.cw/2, self.ch, x, y);
				var rand = Math.round(Math.random() * (3000 - 500)) + 500; // generate new time (between 3sec and 500"s)
				if(multi){
					var varv = Math.round(Math.random() * 360);
					self.hueMax = varv;
					self.hueMin = varv;					
					var arv = Math.round(Math.random() * (1000 - 100)) + 100;
					console.log(arv);
					rand = rand * arv /50;
					while(arv--){
				
			self.partSpeedVariance =Math.round(Math.random() * 25);
			self.fworkSpeed = Math.round(Math.random() * 10);
			self.fworkAccel = Math.round(Math.random() * 10);	
						var x = Math.round(Math.random() * self.cw);
						var y = Math.round(Math.random() * self.ch);
						self.createFireworks(self.cw/2, self.ch, x, y);						
					}
				}
				setTimeout(myFunction, rand);
			}
			myFunction();			
			
			
			self.canvas.onselectstart = function() {
				return true;
			};
			
		};		
		
		/*=============================================================================*/	
		/* Create Particles
		/*=============================================================================*/
		self.createParticles = function(x,y, hue){
			var sound = Math.round(Math.random() * 8+1);
			if(sound == 1)
				fe1.play();
			else if(sound == 2)
				fe2.play();
			else if(sound == 3)
				fe3.play();
			else if(sound == 4)
				fe4.play();
			else if(sound == 5)
				fe5.play();
			else if(sound == 6)
				fe6.play();
			else if(sound == 7)
				fe7.play();
			else if(sound == 8)
				fe8.play();
			if((self.ch /10)>y){
			var sound = Math.round(Math.random() * 40+1);
			if(sound == 1)
				c1.play();
			else if(sound == 2)
				c2.play();

			}
			var countdown = self.partCount;
			while(countdown--){
				var newParticle = {
					x: x,
					y: y,
					coordLast: [
						{x: x, y: y},
						{x: x, y: y},
						{x: x, y: y}
					],
					angle: rand(0, 360),
					speed: rand(((self.partSpeed - self.partSpeedVariance) <= 0) ? 1 : self.partSpeed - self.partSpeedVariance, (self.partSpeed + self.partSpeedVariance)),
					friction: 1 - self.partFriction/100,
					gravity: self.partGravity/2,
					hue: rand(hue-self.hueVariance, hue+self.hueVariance),
					brightness: rand(50, 80),
					alpha: rand(40,100)/100,
					decay: rand(10, 50)/1000,
					wind: (rand(0, self.partWind) - (self.partWind/2))/25,
					lineWidth: self.lineWidth
				};				
				self.particles.push(newParticle);
			}
		};
		
		/*=============================================================================*/	
		/* Update Particles
		/*=============================================================================*/		
		self.updateParticles = function(){
			var i = self.particles.length;
			while(i--){
				var p = self.particles[i];
				var radians = p.angle * Math.PI / 180;
            	var vx = Math.cos(radians) * p.speed;
            	var vy = Math.sin(radians) * p.speed;
				p.speed *= p.friction;
								
				p.coordLast[2].x = p.coordLast[1].x;
				p.coordLast[2].y = p.coordLast[1].y;
				p.coordLast[1].x = p.coordLast[0].x;
				p.coordLast[1].y = p.coordLast[0].y;
				p.coordLast[0].x = p.x;
				p.coordLast[0].y = p.y;
				
				p.x += vx;
				p.y += vy;
				p.y += p.gravity;
				
				p.angle += p.wind;				
				p.alpha -= p.decay;
				
				if(!hitTest(0,0,self.cw,self.ch,p.x-p.radius, p.y-p.radius, p.radius*2, p.radius*2) || p.alpha < .05){					
					self.particles.splice(i, 1);	
				}
			};
		};
		
		/*=============================================================================*/	
		/* Draw Particles
		/*=============================================================================*/
		self.drawParticles = function(){
			var i = self.particles.length;
			while(i--){
				var p = self.particles[i];							
				
				var coordRand = (rand(1,3)-1);
				self.ctx.beginPath();								
				self.ctx.moveTo(Math.round(p.coordLast[coordRand].x), Math.round(p.coordLast[coordRand].y));
				self.ctx.lineTo(Math.round(p.x), Math.round(p.y));
				self.ctx.closePath();				
				self.ctx.strokeStyle = 'hsla('+p.hue+', 100%, '+p.brightness+'%, '+p.alpha+')';
				self.ctx.stroke();				
				
				if(self.flickerDensity > 0){
					var inverseDensity = 50 - self.flickerDensity;					
					if(rand(0, inverseDensity) === inverseDensity){
						self.ctx.beginPath();
						self.ctx.arc(Math.round(p.x), Math.round(p.y), rand(p.lineWidth,p.lineWidth+3)/2, 0, Math.PI*2, false)
						self.ctx.closePath();
						var randAlpha = rand(50,100)/100;
						self.ctx.fillStyle = 'hsla('+p.hue+', 100%, '+p.brightness+'%, '+randAlpha+')';
						self.ctx.fill();
					}	
				}
			};
		};
		
		/*=============================================================================*/	
		/* Create Fireworks
		/*=============================================================================*/
		self.createFireworks = function(startX, startY, targetX, targetY){
			var newFirework = {
				x: startX,
				y: startY,
				startX: startX,
				startY: startY,
				hitX: false,
				hitY: false,
				coordLast: [
					{x: startX, y: startY},
					{x: startX, y: startY},
					{x: startX, y: startY}
				],
				targetX: targetX,
				targetY: targetY,
				speed: Math.round(Math.random() * 9+1),
				angle: Math.atan2(targetY - startY, targetX - startX),
				shockwaveAngle: Math.atan2(targetY - startY, targetX - startX)+(90*(Math.PI/180)),
				acceleration: Math.round(Math.random() * 0.5),
				hue: rand(self.hueMin, self.hueMax),
				brightness: rand(50, 80),
				alpha: rand(50,100)/100,
				lineWidth: self.lineWidth
			};
			self.partSpeed = Math.round(Math.random() * 49 + 1);
//			console.log(self.partGravity);
			self.fireworks.push(newFirework);
//			snd.play();
			var sound = Math.round(Math.random() * 5+1);
			if(sound == 1)
				fw1.play();
			else if(sound == 2)
				fw2.play();
			else if(sound == 3)
				fw3.play();
			else if(sound == 4)
				fw4.play();
			else if(sound == 5)
				fw5.play();
//			snd.currentTime=0;
//			self.createFireworks(startX, startY, targetX+100, targetY)
//			setTimeout(self.createFireworks(startX, startY, targetX, targetY), 2000);
		};
		
		/*=============================================================================*/	
		/* Update Fireworks
		/*=============================================================================*/		
		self.updateFireworks = function(){
			var i = self.fireworks.length;
			while(i--){
				var f = self.fireworks[i];
				self.ctx.lineWidth = f.lineWidth;
				
				vx = Math.cos(f.angle) * f.speed,
				vy = Math.sin(f.angle) * f.speed;
				f.speed *= 1 + f.acceleration;				
				f.coordLast[2].x = f.coordLast[1].x;
				f.coordLast[2].y = f.coordLast[1].y;
				f.coordLast[1].x = f.coordLast[0].x;
				f.coordLast[1].y = f.coordLast[0].y;
				f.coordLast[0].x = f.x;
				f.coordLast[0].y = f.y;
				
				if(f.startX >= f.targetX){
					if(f.x + vx <= f.targetX){
						f.x = f.targetX;
						f.hitX = true;
					} else {
						f.x += vx;
					}
				} else {
					if(f.x + vx >= f.targetX){
						f.x = f.targetX;
						f.hitX = true;
					} else {
						f.x += vx;
					}
				}
				
				if(f.startY >= f.targetY){
					if(f.y + vy <= f.targetY){
						f.y = f.targetY;
						f.hitY = true;
					} else {
						f.y += vy;
					}
				} else {
					if(f.y + vy >= f.targetY){
						f.y = f.targetY;
						f.hitY = true;
					} else {
						f.y += vy;
					}
				}				
				
				if(f.hitX && f.hitY){
					self.createParticles(f.targetX, f.targetY, f.hue);
					self.fireworks.splice(i, 1);
				}
			};
		};
		
		/*=============================================================================*/	
		/* Draw Fireworks
		/*=============================================================================*/
		self.drawFireworks = function(){
			var i = self.fireworks.length;
			self.ctx.globalCompositeOperation = 'lighter';
			while(i--){
				var f = self.fireworks[i];		
				self.ctx.lineWidth = f.lineWidth;
				
				var coordRand = (rand(1,3)-1);					
				self.ctx.beginPath();							
				self.ctx.moveTo(Math.round(f.coordLast[coordRand].x), Math.round(f.coordLast[coordRand].y));
				self.ctx.lineTo(Math.round(f.x), Math.round(f.y));
				self.ctx.closePath();
				self.ctx.strokeStyle = 'hsla('+f.hue+', 100%, '+f.brightness+'%, '+f.alpha+')';
				self.ctx.stroke();	
				
				if(self.showTarget){
					self.ctx.save();
					self.ctx.beginPath();
					self.ctx.arc(Math.round(f.targetX), Math.round(f.targetY), rand(1,8), 0, Math.PI*2, false)
					self.ctx.closePath();
					self.ctx.lineWidth = 1;
					self.ctx.stroke();
					self.ctx.restore();
				}
					
				if(self.showShockwave){
					self.ctx.save();
					self.ctx.translate(Math.round(f.x), Math.round(f.y));
					self.ctx.rotate(f.shockwaveAngle);
					self.ctx.beginPath();
					self.ctx.arc(0, 0, 1*(f.speed/5), 0, Math.PI, true);
					self.ctx.strokeStyle = 'hsla('+f.hue+', 100%, '+f.brightness+'%, '+rand(25, 60)/100+')';
					self.ctx.lineWidth = f.lineWidth;
					self.ctx.stroke();
					self.ctx.restore();
				}
			};
		};
		
		/*=============================================================================*/	
		/* Events
		/*=============================================================================*/
		self.bindEvents = function(){
			$(window).on('resize', function(){			
				clearTimeout(self.timeout);
				self.timeout = setTimeout(function() {
					self.canvas.width = self.cw = $(window).innerWidth();
					self.canvas.height = self.ch = $(window).innerHeight();
					self.ctx.lineCap = 'round';
					self.ctx.lineJoin = 'round';
				}, 100);
			});
			
			$(self.canvas).on('mousedown', function(e){
				self.mx = e.pageX - self.canvas.offsetLeft;
				self.my = e.pageY - self.canvas.offsetTop;
				self.currentHue = rand(self.hueMin, self.hueMax);
				self.createFireworks(self.cw/2, self.ch, self.mx, self.my);	
				
				$(self.canvas).on('mousemove.fireworks', function(e){
					self.mx = e.pageX - self.canvas.offsetLeft;
					self.my = e.pageY - self.canvas.offsetTop;
					self.currentHue = rand(self.hueMin, self.hueMax);
					self.createFireworks(self.cw/2, self.ch, self.mx, self.my);									
				});				
			});
			
			$(self.canvas).on('mouseup', function(e){
				$(self.canvas).off('mousemove.fireworks');									
			});
						
		}
		
		/*=============================================================================*/	
		/* Clear Canvas
		/*=============================================================================*/
		self.clear = function(){
			self.particles = [];
			self.fireworks = [];
			self.ctx.clearRect(0, 0, self.cw, self.ch);
		};
		
		/*=============================================================================*/	
		/* Main Loop
		/*=============================================================================*/
		self.canvasLoop = function(){
			requestAnimFrame(self.canvasLoop, self.canvas);			
			self.ctx.globalCompositeOperation = 'destination-out';
			self.ctx.fillStyle = 'rgba(0,0,0,'+self.clearAlpha/100+')';
			self.ctx.fillRect(0,0,self.cw,self.ch);
			self.updateFireworks();
			self.updateParticles();
			self.drawFireworks();			
			self.drawParticles();
			if(self.partCount == 20)
				stats.update();
		};
		
		self.init();		
		
	}
	

	
	var fworks = new Fireworks(20, 1, 0, 50, 0, 50, false, 0, 90, 30);
	var fworks5 = new Fireworks(20, 1, 0, 50, 0, 50, true, 0, 360, 0);
	var fworks2 = new Fireworks(150, 5, 50, 5, 1, 25, false, 90, 180, 30);
	var fworks3 = new Fireworks(400, 5, 50, 5, 20, 50, false, 180, 270, 30);
	var fworks4 = new Fireworks(150, 25, 50, 10, -20, 10, false, 270, 360, 30);

});