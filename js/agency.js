/*!
 * Based on Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// Smooth scrolling via animate()
// $(document).ready(function(){
//   $("a").on('click', function(event) {
//     if (this.hash !== "") {
//       event.preventDefault();
//       var hash = this.hash;
//       $('html, body').animate({
//         scrollTop: $(hash).offset().top
//       }, 800, function(){
//         window.location.hash = hash;
//       });
//     }
//   });
// });

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

function toggleDiv(id) {
    var div = document.getElementById(id + "_abstract");
    var btn = document.getElementById(id + "_button");
    if (div.style.display === 'none') {
        div.style.display = 'block';
        btn.value = 'Show abstract';
    } else {
        div.style.display = 'none';
        btn.value = 'Hide abstract';
    }
}
