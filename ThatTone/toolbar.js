/**
 *  Tool bar ==> load // save // about
 *  Side bar ==> program/shaders options
 */

var selectedItem;
var selectedProgram;

function loadImage(src) {
    var image = new Image();
    image.onload = function() {
        if (selectedItem) contractItem(selectedItem);
        if (selectedProgram) setSelectedProgram(null);
        selectedItem = null;
        hideDialog();
        uploadImage(image);     // call update function in frame.js to update the texture
    };
    image.src = src;
}

function showDialog() {
    $('#fade').fadeIn();
    $('#dialog').show().css({
        top: -$('#dialog').outerHeight()
    }).animate({
        top: 0
    });
}

function hideDialog() {
    $('#fade').fadeOut();
    $('#dialog').animate({
        top: -$('#dialog').outerHeight()
    }, function() {
        $('#dialog').hide();
    });
}

function contractItem(item) {
    $(item).removeClass('active').animate({ paddingTop: 0 });
    $(item).children('.contents').slideUp();
}

function expandItem(item) {
    $(item).addClass('active').animate({ paddingTop: 10 });
    $(item).children('.contents').slideDown();
}

function setSelectedProgram(program) {
  
    // Set the new program
    $('#nubs').html('');
    selectedProgram = program;

    // Update UI elements and draw program
    if (program) {
        // Reset all sliders
        for (var i = 0; i < program.sliders.length; i++) {
            var slider = program.sliders[i];
            $('#' + slider.id).slider('value', slider.value);
        }

        // Generate all nubs
        for (var i = 0; i < program.nubs.length; i++) {
            var nub = program.nubs[i];
            var x = nub.x * canvas.width;
            var y = nub.y * canvas.height;
            $('<div class="nub" id="nub' + i + '"></div>').appendTo('#nubs');
            var ondrag = (function(nub) { return function(event, ui) {
                var offset = $(event.target.parentNode).offset();
                program[nub.name] = { x: ui.offset.left - offset.left, y: ui.offset.top - offset.top };
                program.update();
            }; })(nub);
            $('#nub' + i).draggable({
                drag: ondrag,
                containment: 'parent',
                scroll: false
            }).css({ left: x, top: y });
            program[nub.name] = { x: x, y: y };
        }

        if (program.reset) program.reset();
        program.update();
    }  
}

/**
 * Select program/shaders from sidebar
 * and call loadshader() to update vertShaderId & fragShaderId in frame.js;
 */
var Program = function(name, init, update, reset) {
    this.name = name;
    this.update = update;
    this.reset = reset;
    this.sliders = [];
    this.nubs = [];
    init.call(this);
};

Program.prototype.addNub = function(name, x, y) {
    this.nubs.push({ name: name, x: x, y: y });
};

Program.prototype.addSlider = function(name, label, min, max, value, step) {
    this.sliders.push({ name: name, label: label, min: min, max: max, value: value, step: step });
};

var programs = {
    'Filmic Tonemapping': [
        new Program('Linear', function() {
            this.addSlider('exposure_adjustment', 'Exposure adjustment', 0, 2, 1, 1);
        }, function () {
            var param = { exposure: { type: 'f', value: 1}};
            loadshader('vertexshader', 'linear', param);
        }),
        new Program('Reinhard', function() {
            this.addSlider('exposure_adjustment', 'Exposure adjustment', 0, 2, 1, 1);
        }, function () {
            var param = { exposure: { type: 'f', value: 1}};
            loadshader('vertexshader', 'ReinhardHdr', param);
        }),
        new Program('Uncharted 2 by Hable', function() {
            this.addSlider('exposure_adjustment', 'Exposure adjustment', 0, 2, 1, 1);
        }, function () {
            var param = { exposure: { type: 'f', value: 1}};
            loadshader('vertexshader', 'HableFilmic', param);
        }),
        // new Program('Burgess-Dawson & Hejl', function() {
        // }),
        // new Program('Haarm-Peter Duiker', function() {
        // }),
        // new Program('Feel lucky', function() {
        // }),
    ],
    'Exposure': [],
    'Noise': []
};

$(document).ready(function(){

    // Generate the HTML for the sidebar
    var nextID = 0;
    for (var category in programs) {
        $('<div class="header">' + category + '</div>').appendTo('#sidebar');
        for (var i = 0; i < programs[category].length; i++) {
            var program = programs[category][i];

            // Generate the HTML for the controls
            var html = '<div class="item"><div class="title">' + program.name + '</div><div class="contents"><table>';
            for (var j = 0; j < program.sliders.length; j++) {
                var slider = program.sliders[j];
                slider.id = 'control' + nextID++;
                html += '<tr><td>' + slider.label + ':</td><td><div class="slider" id="' + slider.id + '"></div></td></tr>';
                html += '</table>';
                
                var item = $(html).appendTo('#sidebar')[0];
                item.program = program;
            }

            // Set all initial nub values
            for (var j = 0; j < program.nubs.length; j++) {
                var nub = program.nubs[j];
                var x = nub.x * canvas.width;
                var y = nub.y * canvas.height;
                program[nub.name] = { x: x, y: y };
            }

            // Make jQuery UI sliders
            for (var j = 0; j < program.sliders.length; j++) {
                var slider = program.sliders[j];
                program[slider.name] = slider.value;
                var onchange = (function(program, slider) { return function(event, ui) {
                    program[slider.name] = ui.value;
                    if (selectedProgram == program) program.update();
                }; })(program, slider);
                $('#' + slider.id).slider({
                    slide: onchange,
                    change: onchange,
                    min: slider.min,
                    max: slider.max,
                    value: slider.value,
                    step: slider.step
                });
            }
        }
    }

    // Change the program when a sidebar item is clicked
    $('#sidebar .item .title').live('mousedown', function(e) {
        var item = e.target.parentNode;
        if (selectedItem) contractItem(selectedItem);
        if (selectedItem != item) {
            expandItem(item);
            selectedItem = item;
            setSelectedProgram(item.program);
        } else {
            setSelectedProgram(null);
            selectedItem = null;
        }
    });


	$('#load').click(function() {
        $('#dialog').html('<div class="contents">Pick one of the sample images below or upload an image of your own:<div class="images">' +
            '<img class="loader" src="images/whitehouse.JPG" height="100">' +
            '<img class="loader" src="images/park.JPG" height="100">' +
            '<img class="loader" src="images/sunrise.JPG" height="100">' +
            '<img class="loader" src="images/tree.JPG" height="100">' +
            '<img class="loader" src="images/riverside.JPG" height="100">' +
            '<img class="loader" src="images/sunset.JPG" height="100">' +
            '</div><div class="credits">All Images By Yuping Zhang. All right reserved.\n' +
            '<div class="button"><input type="file" class="upload">Upload File...</div>' +
            '<div class="button closedialog">Cancel</div>');
        showDialog();
    });
    $('#dialog input.upload').live('change', function(e) {
        var reader = new FileReader();
        reader.onload = function(e) {
            loadImage(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    });
    $('#dialog img.loader').live('mousedown', function(e) {
        loadImage(e.target.src);
    });
    $('#save').click(function() { 
        saveImage();          // this function is defined in frame.js
    });
    $('#about').click(function() {
        $('#dialog').html('<div class="contents">Copyright 2015 <a href="http://draupnir37.com">Yuping Zhang</a>' +
        '<br><br>Welcome to my toy image editor. This is the place where I play around shaders to edit images the way I want. I started this project with some HDR tone mapping methods I researched on. I will add more effects later. <br> Powed by three.js. </div><div class="button ' +
        'closedialog">Close</div>');
        showDialog();
    });

    $('.closedialog').live('click', function() {
        hideDialog();
    });
});

