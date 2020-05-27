// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById('myPics');
const context = myPics.getContext('2d');

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

myPics.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  //context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 15;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  }

  //context.closePath();

  //context.beginPath();
  //context.closePath();
  

function send(){

  var scratchCanvas = document.getElementById('myPics');
  //var context = scratchCanvas.getContext('2d');
  var dataURL = scratchCanvas.toDataURL();

  var predict = document.getElementById('predict')

  console.log(dataURL)
  $.ajax({
  type: "POST",
  url: "http://127.0.0.1:3000/upload",
  data:{
      imageBase64: dataURL
  },
  dataType: 'JSON',
  success: function (data) {console.log(data);
  
    predict.innerHTML = 'CLASS PREDICTED: ' + data['predict']
  
  }

  }).done(function() {
  console.log('sent');
  });

}
 
