var statusModel = ""
objects = []
objectDetector = ""

function preload() {
    canvasImage = loadImage("room.jpeg")
}

function setup() {
    canvas = createCanvas(1000, 600)
    canvas.center()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded() {
    document.getElementById("status").innerHTML = "Detecting Objects..."
    objectDetector.detect(canvasImage, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.log("It doesn't work. Fix it. This is the error if you're too dumb to know what it is:" + error)
    } else {
        console.log(result)
        objects = result
        statusModel = true
    }
}

function draw() {
    image(canvasImage, 0, 0, 1000, 800)
    if (statusModel != "") {
        document.getElementById("status").innerHTML = "Objects: " + objects.length
        for (i = 0; i < objects.length; i++) {
            fill("red")
            textSize(20)
            text(objects[i].label + ": " + Math.round(objects[i].confidence * 100) + "%", objects[i].x + 10, objects[i].y + 20)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}