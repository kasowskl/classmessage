(function ($) {


    $.fn.drawable = function (settings) {
        var thisid = this;
        var circleSize;
        var options = $.extend({
            color: "blue",
            width: "4px",
            lineWidth : 15,
            lineJoin : 'round',
            lineCap : 'round',
            shape : "line",
            shadowOffsetX : "12px",
            shadowOffsetY : "12px",
            shadowBlur : 10,
            shadowColor : 'rgb(0, 0, 0)'

    }, settings);

        var position = this.position();
        var top = position.top;
        var left = position.left;

        

        this.prepend('<canvas id="paint" style="position:fixed; top:' + top + ';left:' + left +';height:inherit;width:inherit"></canvas>');
        var canvas = document.querySelector('#paint');
        var ctx = canvas.getContext('2d');

        var sketch = document.querySelector('#paint');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = { x: 0, y: 0 };
        var last_mouse = { x: 0, y: 0 };

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        var shape = options.shape;
        /* Drawing on Paint App */
        ctx.lineWidth = options.lineWidth;
        ctx.lineJoin = options.lineJoin;
        ctx.lineCap = options.lineCap;
        ctx.strokeStyle = options.color;
        ctx.shadowColor = options.shadowColor;
        ctx.shadowOffsetX = options.shadowOffsetX;
        ctx.shadowOffsetY = options.shadowOffsetY;
        ctx.shadowBlur = options.shadowBlur;
        ctx.shadowColor = options.shadowColor;
        
    
        canvas.addEventListener('mouseover', function (e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseout', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        
        var onPaint = function () {
            if (shape == "circle") {
                ctx.beginPath();


                i = 50;
                //ctx.closePath();
                setInterval(function () {
                    i = i - 2;

                }, 500);

                ctx.arc(mouse.x - 10, mouse.y - 10, i, 0, Math.PI * 2, false);
                ctx.stroke();

            }
            else {
                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }

            


        };
           
        

    };
       


   
    // Plugin Definition
    $.fn.rainbow = function (options) {

        var div = this; // put element into var 
        var newblinkclass; // new class for blink text 
        var timer;


        // set default variables for all properites
        var settings = $.extend({
            // set defaults
            color: "green",
            speed: "500",
            repeat: "yes",
            border: "0px",
            effect: "blink",
            stop: "never",
            pause: "never",
            transition: "smooth"
        }, options);


        // get values from properties
        var exp = settings.speed;
        var color = settings.color;
        var rep = settings.repeat;
        var effect = settings.effect;
        var border = settings.border;
        var borderColour = settings.borderColour;
        var stop = settings.stop;
        var pause = settings.pause;
        var trans = settings.transition;


        // retrive effect speed
        switch (exp) {
            case "slow":
                exp = 3000;
                break;
            case "medium":
                exp = 1500;
                break;
            case "fast":
                exp = 500;
                break;

        }



        /* ------------------------------------------------------------ RIPPLE EFFECT ------------------------------------------------------------------------------------------------*/

        if (effect == "ripple") {

            //global vars
            var i = 0;
            var a = 255;
            var r = 0;
            var div = this;
            var colors = ["#f81a0b", "#ff7d00", "#ffdb00", "#f5ff00", "#bcfb05", "#00ff24", "#00ffc8", "#00d0ff", "#00a1ff", "#0024ff", "#8000ff", "#ff00ea", "#ff006d"];

            var blues = ["#f81a0b", "#ff7d00", "#ffdb00", "#f5ff00", "#bcfb05", "#00ff24", "#00ffc8", "#00d0ff", "#00a1ff", "#0024ff", "#8000ff", "#ff00ea", "#ff006d"];

            if (trans == "smooth") {
                // load necessary jQuery UI files and plugins dynamically 
                $('head').append("<link rel='stylesheet' href='jquery-recolor-styles.css' />");
                $('head').append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />' +
                             '<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>');

               

                // if 'this' is a div element 
                //if (div.is('div')) {
                //    setInterval(function () {
                //        i = i + 1;
                //        div.animate({ backgroundColor: "'" + colors[i] + "'" });
                //        if (i >= 13)
                //            i = 0;
                //    }, exp);
                //}


                if (div.is('div')) {
                    setInterval(function () {

                        i = i + 5;
                        a = a - 5;
                        
                        
                        if (i >= 255)
                        {
                            i = 0;
                            a = 255;
                            r = r + 30;
                        }

                        if(r >= 255)
                        {
                            r = r - 30;
                            i = i - 5;
                            a = a + 5;
                        }

                        div.animate({ backgroundColor: "rgba(" + r + "," + i + "," + a + ",0.7)" });
                            
                    }, exp);
                }

                if (div.is('p') || div.is('span') || div.is('h1') || div.is('h2')) {
                    setInterval(function () {

                        i = i + 5;
                        a = a - 5;


                        if (i >= 255) {
                            i = 0;
                            a = 255;
                            r = r + 30;
                        }

                        if (r >= 255) {
                            r = r - 30;
                            i = i - 5;
                            a = a + 5;
                        }

                        div.animate({ color: "rgba(" + r + "," + i + "," + a + ",0.7)" });

                    }, exp);
                }

                //// if 'this' is text
                //if (div.is('p')) {
                //    setInterval(function () {
                //        i = i + 1;
                //        div.animate({ color: "'" + colors[i] + "'" });
                //        if (i >= 13)
                //            i = 0;
                //    }, exp);
                //}
            }
            else if (trans == "chop") {

               

                // if 'this' is a div element 
                if (div.is('div')) {
                    setInterval(function () {
                        i = i + 1;
                        div.css('backgroundColor' , colors[i]);
                        if (i >= 13)
                            i = 0;
                    }, exp);
                }

                // if 'this' is text
                if (div.is('p')) {
                    setInterval(function () {
                        i = i + 1;
                        div.css('color', colors[i]);
                        if (i >= 13)
                            i = 0;
                    }, exp);
                }
            }


        }

        /*------------------------------------------------------------------------- BLINK EFFECT -------------------------------------------------------------------------------------*/
        else if (effect == "blink") {


            // set blinking class for div and table elements
            if (div.is("div")) {
                newblinkclass = ".blinking { background-color:" + color + "; border: " + border + " solid " + borderColour + "}";
            }

            // set blinking class for text elements
            else if (this.is("p")) {
                var newblinkclass = ".blinking {  color:" + color + ";" + "}";
            }

            // set blinking class for images
            else if (this.is("img")) {
                var newblinkclass = ".blinking { border:" + border + " solid " + borderColour + ";}";
                var paddingclassTemp = ".paddingTemp { padding: " + border + ";}";
            }

            // generate dynamic stylesheet 
            $("head").append("<style id='dynamicStylesheet'></style>");
            $("#dynamicStylesheet").text(newblinkclass + paddingclassTemp);

            // set animation to repeat
            if (rep == "yes") {

                timer = setInterval(function () {
                    blinkEl(div);
                }, exp);
            }

            // run animation once only 
            if (rep == "no") {
                timer = setTimeout(function () {
                    blinkEl(div);
                }, exp);
            }

            // toggle blink class to element - create effect
            function blinkEl(div) {
                // stop animation on hover
                if (stop == "hover") {
                    div.hover(function () { clearInterval(timer) });
                }

                // stop animation on click
                if (stop == "click") {
                    div.click(function () { clearInterval(timer) });
                }

                div.toggleClass('blinking');

            }
        }




    };

})(jQuery);
