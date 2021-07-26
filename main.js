
status = "";
objects = [];
function preload() {
    
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(400,130);
        img=createCapture(VIDEO);
    img.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 450);
    if (status != "") {
        r=random(255);
        g=random(255);
        b=random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects  Detected";
            document.getElementById("objects").innerHTML = "Number of objects detected are :" + objects.length;
            fill(r,g,b);
            stroke(r,g,b);
            noFill();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }



}