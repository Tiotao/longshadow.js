// helper class to shade color

function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

function shadeColor2(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function shade(color, percent){
    if (color.length > 7 ) return shadeRGBColor(color,percent);
    else return shadeColor2(color,percent);
}


var parseCSS = function (original, array) {
	var css = ', ' + array[0] + 'px ' + array[1] + 'px ' + array[2];
	return original + css
}

var longShadow = function (target, degree, color, length, shade_ratio) {
	
	// default

	degree = degree % 360

	if (degree === 90 || degree === 0 || degree === 180 || degree == 360 || degree == 270) {
		degree = degree + 0.1
	}
	shade_ratio = typeof shade_ratio !== 'undefined' ? shade_ratio : 1/15;
   	degree = typeof degree !== 'undefined' ? degree : 45;
   	length = typeof length !== 'undefined' ? length : 150;
	
	
	radian = degree * (Math.PI / 180);

   	length_ratio = Math.tan(radian);

   	console.log(length_ratio)

	var value = '0px 0px ' + color;

	var normal_x = 1;
	var normal_y = 1;


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

	var x = 0;
	var y = 0;


	for (var i = 1; i < length; i++) {
		x = i
		y = x * length_ratio
		x_n = x * normal_x
		y_n = y * normal_y
		value = parseCSS(value, [x_n, y_n, shade(color, i * shade_ratio)])
	}

	target.css('box-shadow', value)

}




