"use strict";

let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

function randomColor(){
     let color = "#";
     let num = 0;
     for(let i = 0;i<6;i++){
        num = Math.floor(Math.random() * 16);
        switch(num){
            case 10:
                num = 'A';
                break;
            case 11:
                num = 'B';
                break;
            case 12:
                num = 'C';
                break;
            case 13:
                num = 'D';
                break;
            case 14:
                num = 'E';
                break;
            case 15:
                num = 'F';
                break;
        }
         color += num;
     }
     return color;
}

function drawRect(){
    context.save();
    context.translate(canvas.width/2,canvas.height/2);

    let hs = 0, vs = 0;
    while(hs === vs){
        hs = Math.random();
        vs = Math.random();
    }

    context.transform(1, hs, vs, 1, 0, 0);

    context.rotate(Math.PI * (Math.random() * 360));

    context.globalAlpha = Math.random();

    context.beginPath();
    context.rect(Math.random()*canvas.clientWidth/2, Math.random()*canvas.clientHeight/2, Math.random()*canvas.clientWidth/2, Math.random()*canvas.clientHeight/2);
    context.fillStyle = randomColor();
    context.fill();

    context.lineWidth = Math.random() * 10;
    context.strokeStyle = randomColor();
    context.stroke();
    context.restore();
}

function drawTri(){
    context.save();

    context.translate(Math.random()*canvas.width, Math.random()*canvas.height);

    context.globalAlpha = Math.random();

    context.fillStyle = randomColor();
    context.lineWidth = Math.random() * 2;
    context.strokeStyle = randomColor();

    context.beginPath();
    context.moveTo(0,0);

    let radius = Math.random() * (canvas.width/2);
    let angle = Math.random() * (Math.PI * 2);

    context.lineTo(Math.cos(angle)*radius, Math.sin(angle)*radius);

    radius = Math.random() * (canvas.width/2);
    angle = Math.random() * (Math.PI * 2);

    context.lineTo(Math.cos(angle)*radius, Math.sin(angle)*radius);

    context.closePath();
    context.fill();
    context.stroke();

    context.restore();
}

function drawEllipse(){
    context.save();

    context.translate(Math.random() * canvas.width, Math.random() * canvas.height);

    context.globalAlpha = Math.random();

    context.fillStyle = randomColor();
    context.lineWidth = Math.random() * 5;
    context.strokeStyle = randomColor();

    context.beginPath();

    context.ellipse(0, 0, Math.random()*100, Math.random()*100, Math.random()*(Math.PI*2), 0, Math.PI*2, true);

    context.fill();
    context.stroke();

    context.restore();
}

function drawTrap(){
    context.save();

    context.translate(Math.random() * canvas.width, Math.random() * canvas.height);

    context.globalAlpha = Math.random();
    context.lineWidth = Math.ceil(Math.random() * 2);

    context.beginPath();

    let radius = [(Math.random() * (canvas.width/2))];
    let angle = Math.random() * (Math.PI * 2);
    let height = [0];

    //generate first of parallel lines
    context.moveTo(0, height[0]);
    context.lineTo(Math.cos(angle)*radius[0], Math.sin(angle)*radius[0]);

    radius.push(Math.random() * (canvas.width/2));
    height.push(Math.random() * (canvas.height/3));

    //connect parallel lines before drawing the second parallel line
    context.moveTo(0, height[0]);
    context.lineTo(0, height[1]);

    context.moveTo(0, height[1]);
    context.lineTo(Math.cos(angle)*radius[1], Math.sin(angle)*radius[1] + height[1]);

    //connect corresponding sides of parallel lines to form trapezoid
    context.moveTo(Math.cos(angle)*radius[0], Math.sin(angle)*radius[0]);
    context.lineTo(Math.cos(angle)*radius[1], Math.sin(angle)*radius[1] + height[1]);

    context.stroke();

    context.restore();
}

function drawShapes(){
    let shapes = [drawRect, drawTri, drawEllipse, drawTrap];
    shapes[Math.floor(Math.random() * 4)]();
}

setInterval(drawShapes, 50);
