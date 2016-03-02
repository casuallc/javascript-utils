function drawRegularPolygon(mContext, center, len, num) {
	if(num < 3 || len <= 0) {
		return;
	}
	mContext.translate(center.x, center.y);
	var array = new Array();
	var step = Math.PI*2 / num;
	// y轴负半轴夹角
	var curD = 0;
	for(var i=0; i<num; i++) {
		// 
		if(curD == 0) {
			array.push(new Point(0, -len));
		} else if(curD < Math.PI/2) {
			array.push(new Point(Math.sin(curD)*len, -Math.cos(curD)*len));
		} else if(curD == Math.PI/2) {
			array.push(new Point(len, 0));
		} else if(curD < Math.PI) {
			array.push(new Point(Math.sin(Math.PI-curD)*len, Math.cos(Math.PI-curD)*len));
		} else if(curD == Math.PI) {
			array.push(new Point(0, len));
		} else if(curD < Math.PI*3/2) {
			array.push(new Point(-Math.sin(curD-Math.PI)*len, Math.cos(curD-Math.PI)*len));
		} else if(curD == Math.PI*3/2) {
			array.push(new Point(-len, 0));
		} else if(curD < Math.PI*2) {
			array.push(new Point(-Math.sin(Math.PI*2-curD)*len, -Math.cos(Math.PI*2-curD)*len));
		} else if(curD = Math.PI*2) {
			array.push(new Point(0, -len));
		}
		curD += step;
	}
	
	mContext.beginPath();
	mContext.moveTo(array[0].x, array[0].y);
	for(var i=1; i<array.length; i++) {
		mContext.lineTo(array[i].x, array[i].y);
	}
	mContext.closePath();
	mContext.stroke();
	
	mContext.translate(-center.x, -center.y);
	for(var i=0; i<array.length; i++) {
		array[i].x += center.x;
		array[i].y += center.y;
	}
	return array;
}
