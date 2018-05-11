//Event listeners
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

addEventListener('click', function() {
    init();
});

addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

//Stored objects
var mouse = {
    x: undefined,
    y: undefined
}

//Canvas Setup
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

//Draw - Object Function
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    //dx && dy = acceleration
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;
    // canvas methods/properties to draw circles
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "white";
        c.lineWidth = 1;
        c.stroke();
    }
    // MOTION: if circles hit top window edge, bounce back
    this.update = function() {

        this.y -= this.dy;
        this.x -= this.dx;
        //impression of bubbles getting closer to you
        this.radius += .003;

        this.draw();
    }
}

//store each circle
var circleArray;

function init() {
    //once you draw somethign in canvas, there's no way to reference it again. a workaround is to store data in an array
    circleArray = [];
    //set # circles, store each in array
    for(let i = 0; i < 2000; ++i) {
        var x = (canvas.width / 2) + ((Math.random() * 2 - 1) * 30);
        var dx = (Math.random() * 2 - 1)*1.25;
        var y = (canvas.height / 2) + ((Math.random() * 2 - 1) * 30);
        var dy = (Math.random() * 2 - 1)*1.25;
        var radius = Math.random() * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for(let i = 0; i < circleArray.length; ++i) {
        circleArray[i].update();
    }
}

init();
animate();