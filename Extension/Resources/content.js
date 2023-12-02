//
// Inject a script into the main window execution context
//
// Based on code from:
// https://stackoverflow.com/questions/9515704/access-variables-and-functions-defined-in-page-context-using-a-content-script
// Specifically, answer: https://stackoverflow.com/a/9517879
//

var actualCode = '(' + function() {

    // Handle swipes left and right to go back and forward
    document.body.addEventListener('touchstart', (event) => {
        console.log(event.target.src);
        if (event.target.tagName == "IMG" &&
            event.target.src.includes(".webp")) {
            
            let url = new URLSearchParams(event.target.src);
            url.set("fidelity", "high");
            url.set("maxwidth", "9999");
            
            event.target.src = event.target.src.split('?')[0] + "?" + url.toString();
        }
        console.log(event.target.src);
    });


   // script injection code
} + ')();';

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();

setTimeout(function(){console.log("BEEP");}, 5000);

