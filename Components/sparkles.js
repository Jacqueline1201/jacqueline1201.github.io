var WIDTH, HEIGHT, canvas, con, g;
var pxs = [];
var rint = 70;
$(document).ready(function() {
    console.log("READY");
    var windowSize = function() {
        WIDTH = $('.dark').innerWidth();
        HEIGHT = $('.dark').innerHeight();
        canvas = $('#galaxy');
        canvas.attr('width', WIDTH).attr('height', HEIGHT);
    };

    windowSize();
  
    $(window).resize(function() {
        windowSize();
    });

    con = canvas[0].getContext('2d');
    for (var i = 0; i < 100; i++) {
        pxs[i] = new Circle();
        pxs[i].reset();
        pxs[i].setY(Math.random()*HEIGHT);
    }
    requestAnimationFrame(draw);
});

function draw() {
    con.clearRect(0, 0, WIDTH, HEIGHT);
    con.globalCompositeOperation = "lighter";
    for (var i = 0; i < pxs.length; i++) {
        pxs[i].fade();
        pxs[i].move();
        pxs[i].draw();
    }
    requestAnimationFrame(draw);
}

function Circle() {
    this.s = {
        ttl: 15000,
        xmax: 2,
        ymin: 0.9,
        ymax: 2, // descent speed
        rmax: 30, // size
        rt: 1,
        xdef: WIDTH/2,
        ydef: 1,
        xrandom: true,
        yrandom: false,
        blink: true
    };
    this.reset = function() {
        this.x = (this.s.xrandom ? WIDTH * Math.random() : this.s.xdef);
        this.y = (this.s.yrandom ? HEIGHT * Math.random() : this.s.ydef);
        this.r = ((this.s.rmax - 1) * Math.random()) + 10;
        this.dx = (Math.random() * this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
        this.dy = Math.max(this.s.ymin, (Math.random() * this.s.ymax)) * (Math.random() < 0.5 ? -1 : -1);
        this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random()+1;
        this.stop = Math.random() * 0.2 + 0.4;
    };
    this.fade = function() {
        if (this.s.blink) this.rt += this.s.rt;
    };
    this.draw = function() {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1; // blinks
        // else if (this.rt >= this.hl) this.reset(); //reset
        var newo = 1 - (this.rt / this.hl);
        con.beginPath();
        con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        con.closePath();
        var cr = this.r * newo;
        g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        g.addColorStop(0.0, 'rgba(248,199,204,' + newo + ')');
        g.addColorStop(this.stop, 'rgba(248,199,204,' + (newo * 0.2) + ')');
        g.addColorStop(1.0, 'rgba(248,199,204,0)');
        con.fillStyle = g;
        con.fill();
    };
    this.move = function() {
        this.x += (this.rt / this.hl) * this.dx;
        console.log(this.rt / this.hl);
        this.y -= Math.max(1, (this.rt / this.hl)) * this.dy;
        // if (true) this.dx *= -1;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        // if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
        if (this.y > HEIGHT || this.y < 0) this.reset();
        // if (this.y > HEIGHT) this.dy *= this.reset();
    };
    this.getX = function() {
        return this.x;
    };
    this.getY = function() {
        return this.y;
    };
    this.setY = function(height) {
        this.y = height;
    }
};
