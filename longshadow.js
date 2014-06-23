// helper class to shade color
function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}


function parseCSS (original, array) {
	var css = ', ' + array[0] + 'px ' + array[1] + 'px ' + array[2];
	return original + css
}

function longShadow (target, degree, color, background, length, shade_ratio) {
	
	var attr;
	var normal_x;
	var normal_y;
	var x;
	var y;
	var value = '0px 0px ' + color;

	degree = degree % 360

	if (degree === 90 || degree === 0 || degree === 180 || degree == 360 || degree == 270) {
		degree = degree + 0.1
	}
	
	shade_ratio = typeof shade_ratio !== 'undefined' ? shade_ratio : 1/15;
   	degree = typeof degree !== 'undefined' ? degree : 45;
   	length = typeof length !== 'undefined' ? length : 150;
   	background = typeof background !== 'undefined' ? background : '#FFFFFF';
	
	radian = degree * (Math.PI / 180);
   	length_ratio = Math.tan(radian);

	if (degree >= 0 && degree < 90) {
		normal_x = 1
		normal_y = -1
	} else if (degree >= 90 && degree < 180) {
		normal_x = -1
		normal_y = 1
	} else if (degree >= 180 && degree < 270) {
		normal_x = -1
		normal_y = 1
	} else {
		normal_x = 1
		normal_y = -1
	}

	for (var i = 1; i < length; i++) {
		x = i * normal_x
		y = i * length_ratio * normal_y
		value = parseCSS(value, [x, y, blendColors(color, background , i * shade_ratio)])
	}

	if (target.is('p, h1, h2, h3, h4, h5, h6')) {
		attr = 'text-shadow'
	} else {
		attr = 'box-shadow'
	}

	target.css(attr, value)

}




