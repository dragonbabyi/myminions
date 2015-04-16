/**
 * whiteboard
 * show information about current scene
 * show info of the highlight
 **/
// "==========" + scenename + "==========" + 
// //pseudo code
// spans.forEach( span ) {
//	span + ":" +
//	forEach( key ) {
//		obj.key + "span[key]"
//	}
// } 

var line = "============================" + "<br />"; 

var instruction = line + line;
instruction +=  "	Instruction   " + "<br />" +
				"Click on the cube to view" +  "<br />" +
				"Click again to put it back" +  "<br />" +
				"Click on the plane to add new cube" + "<br />" +
				"Shift click to remove cube" + "<br />" +
				"Press D to toggle between scenes" + "<br />" +
				"Press S to save current scene to image" + "<br />" +
				"Use the GUI to edit the current scene" + "<br />" +
				"Don't forget to save it before toggle" + "<br />" +
				line;

var str = instruction + line + "This is how your life looks like right now" +  "<br />" + line;
var addStr;
// when switch to a new scene, update the text
function updateStr( obj ) {
	// 
	if ( obj.type == "scene" ) {
		str = instruction + line;
		str += obj.name + "<br />" + line;
		str += "Info" + "<br />" + obj.info + "<br />" + line;
	} 
	else {
		//show highlight info
		addStr = "Span highlight:" + "<br />" + "Lable:  " + obj.label;
		addStr += "<br />" + "Info:  " + obj.info + "<br />" + line;
	}
}


function displayboard() {
	// display
	var node = $('#info');
	var text;
	if (addStr) {
		text = str + addStr;
	} else {
		text = str;
	}
	node.html(text);
   
}