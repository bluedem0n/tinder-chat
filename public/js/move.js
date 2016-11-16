
$(function(){
 var arr = JSON.parse(window.localStorage.getItem("array"));
 $(".drag-drop").html('<img src="https://graph.facebook.com/' + arr[Math.floor(Math.random() * Object.keys(arr).length)] + '/picture">');
});
// Elementos de destino con la clase "arrastrable"
interact('.draggable')
  .draggable({
 //Habilitar lanzamiento inercial
 inertia: true,
 // Mantener el elemento dentro del área de su padre
 restrict: {
   restriction: "parent",
   endOnly: true,
   elementRect: {
  top: 0,
  left: 0,
  bottom: 1,
  right: 1
   }
 },
 // habilitar autoScroll
 autoScroll: true,
 // Llamar a esta función en cada evento dragmove
 onmove: dragMoveListener,
 // Llamar a esta función en cada evento de dragend
  });

function dragMoveListener(event) {
  var target = event.target,
 // Mantener la posición arrastrada en los atributos data-x / data-y
 x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
 y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
 target.style.transform =
 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// Esto se usa más adelante en las demostraciones de cambio de tamaño y gesto
window.dragMoveListener = dragMoveListener;

/*El código de arrastrar para '.draggable' de la demostración anterior
 * Se aplica a esta demostración, así que no tiene que repetirse.*/

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // Sólo acepta elementos que coincidan con este selector CSS
  accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:
  //

  ondragleave: function (event) {
 // remove the drop feedback style
 var draggableElement = event.relatedTarget,
   dropzoneElement = event.target;
 var left = document.getElementById("outer-dropzone");

 // feedback the possibility of a drop
 if (dropzoneElement == left) {
   draggableElement.textContent = 'NOT LIKE';
 } else {
   draggableElement.textContent = 'YES LIKE ';

 }

  },
  ondrop: function (event) {
 // feedback the possibility of a drop
 var draggableElement = event.relatedTarget,
   dropzoneElement = event.target;
 var left = document.getElementById("outer-dropzone");

 if (dropzoneElement == left) {
   draggableElement.classList.add("animated", "fadeOutLeftBig");
   setTimeout(function () {
  draggableElement.remove(draggableElement.selectedIndex);
   }, 1000)
 } else {
   draggableElement.classList.add("animated", "fadeOutRightBig");
   setTimeout(function () {
    draggableElement.remove(draggableElement.selectedIndex);
  }, 1000)
  //draggableElement.remove(draggableElement.selectedIndex);
  //draggableElement.remove.classList("animated");
 }

  },


});
