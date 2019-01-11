var container, renderer, scene;
var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 5, 3000000);
var keyboard = new THREEx.KeyboardState(); //键盘按键状态
var mstate = Object.freeze({ "left": 1, "middle": 2, "right": 3, "none": 4 }); //鼠标按键
var mousstate = mstate.none;
var mouse = { x: 0, y: 0 }; //鼠标点
var projector = new THREE.Projector(); //鼠标点击反投影
var mouse2 = { x: 0, y: 0 } //纪录鼠标移动状态
var clock = new THREE.Clock();
var pointcount = 500000;
var tom = 44954 / 7248;
var pw = 1024;
var spw = 6539;
var xmldx = -1358;
var xmldz = 16274;
var scale = spw / pw * tom;
var toone = 3;
var cl = 1280;
var ro = 1280;
var lay = 1;
var particleGroup
var times;
var geometry = new THREE.BufferGeometry();
var particleSystem, uniforms;

var positions;
var colors;
var sizes;
var particles;
var waterlist = []
var sprites = [];
var targets = [];
var towncamerpoints = [];
var gkdatas = [];

var line_material1 = new THREE.MeshPhongMaterial({
	color: 0xff0000,
	specular: 0x990000,
	shininess: 50,
	side: THREE.DoubleSide,
	vertexColors: THREE.VertexColors,
	shading: THREE.SmoothShading,
	opacity: 0,
	transparent: true
});

var line_material2 = new THREE.MeshPhongMaterial({
	color: 0xff0000,
	specular: 0x990000,
	shininess: 50,
	side: THREE.DoubleSide,
	vertexColors: THREE.VertexColors,
	shading: THREE.SmoothShading,
	opacity: 0.9,
	transparent: true
});

var line_material3 = new THREE.MeshPhongMaterial({
	color: 0x00ff22,
	specular: 0x009911,
	shininess: 50,
	side: THREE.DoubleSide,
	vertexColors: THREE.VertexColors,
	shading: THREE.SmoothShading,
	opacity: 0.9,
	transparent: true
});
var tree

function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	container = document.getElementById('ThreeJS');
	container.appendChild(renderer.domElement);
	THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });

	scene = new THREE.Scene();
	scene.add(camera);
	camera.position.set(20209, 15138, 58122);
	camera.rotation.set(0, 0, 0);

	scene.add(new THREE.AmbientLight(0xffffff));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(0, 10000, 0);
	scene.add(light);

	var cubeMap = new THREE.CubeTexture([]);
	cubeMap.format = THREE.RGBFormat;

	var loader = new THREE.ImageLoader();
	loader.load('models/skybox/myskybox.jpg', function(image) {

		var getSide = function(x, y) {

			var size = 1024;

			var canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;

			var context = canvas.getContext('2d');
			context.drawImage(image, -x * size, -y * size);
			
			return canvas;

		};

		cubeMap.images[0] = getSide(2, 1); // px
		cubeMap.images[1] = getSide(0, 1); // nx
		cubeMap.images[2] = getSide(1, 0); // py
		cubeMap.images[3] = getSide(1, 2); // ny
		cubeMap.images[4] = getSide(1, 1); // pz
		cubeMap.images[5] = getSide(3, 1); // nz
		cubeMap.needsUpdate = true;

	});

	var cubeShader = THREE.ShaderLib['cube'];
	cubeShader.uniforms['tCube'].value = cubeMap;

	var skyBoxMaterial = new THREE.ShaderMaterial({
		fragmentShader: cubeShader.fragmentShader,
		vertexShader: cubeShader.vertexShader,
		uniforms: cubeShader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	var skyBox = new THREE.Mesh(
		new THREE.BoxGeometry(500000, 500000, 500000),
		skyBoxMaterial
	);
	skyBox.position.x = 5401;
	skyBox.position.z = 20553;

	scene.add(skyBox);

	var onProgress = function(xhr) {
		if(xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};

	var onError = function(xhr) {};

	THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

	var floormtlLoader = new THREE.MTLLoader();
	floormtlLoader.setPath('models/map/');
	floormtlLoader.setBaseUrl('models/map/');
	floormtlLoader.load('main.mtl', function(materials) {

		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('models/map/');
		objLoader.load('main.obj', function(object) {
			for(var i = 0; i < object.children.length; i++) {
				var child = object.children[i];
				object.children[i].material.side = THREE.DoubleSide;
			}
			scene.add(object);

		}, onProgress, onError);

	});

	var riverloader = new THREE.OBJLoader();
	riverloader.load('models/map/river.obj', function(obj) {
		var river = [];
		for(var i = 0; i < obj.children.length; i++) {
			var child = obj.children[i]
			if(child.type == "Mesh") {
				var geometry = child.geometry;
				var part = {
					geometry: geometry,
					direction: Math.PI / 5 * 6,
				};
				river.push(part);
			}
		}
		river[0].direction = Math.PI / 4 * 5;

		var waterNormals = new THREE.TextureLoader().load('models/map/waternormals.jpg');
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
		for(var i = 0; i < river.length; i++) {
			var water = new THREE.Water(renderer, camera, scene, {
				textureWidth: 512,
				textureHeight: 512,
				waterNormals: waterNormals,
				alpha: 1.0,
				sunDirection: light.position.clone().normalize(),
				sunColor: 0xffffff,
				waterColor: 0x557e90,
				distortionScale: 50.0,
				speed: 100,
				direction: river[i].direction
			});
			waterlist.push(water);
			var mirrorMesh = new THREE.Mesh(river[i].geometry, water.material);
			mirrorMesh.add(water);
			// mirrorMesh.material.side = THREE.DoubleSide
			mirrorMesh.rotation.x = -Math.PI / 2;
			// mirrorMesh.rotation.y = Math.PI ;
			scene.add(mirrorMesh);
		}
	});

	loadresultdata("models/TNTresult.xml");
	var shaderMaterial = new THREE.ShaderMaterial({

		vertexShader: document.getElementById('vertexshader').textContent,
		fragmentShader: document.getElementById('fragmentshader').textContent,

		side: THREE.DoubleSide,
		transparent: true

	});
	var radius = 200;

	particles = Math.floor(pointcount / toone / toone) * lay;

	positions = new Float32Array(particles * 3);
	colors = new Float32Array(particles * 4);
	sizes = new Float32Array(particles);

	var ts = times[0];

	setbuff(ts);
	loadgklast("DD", onProgress, onError);
	loadgklast("LWJ", onProgress, onError);
	loadgklast("MS", onProgress, onError);
	loadgklast("SSSZ", onProgress, onError);
	loadgklast("TNT", onProgress, onError);
	loadgklast("XLXC", onProgress, onError);
	loadgklast("YJQ", onProgress, onError);
	loadgklast("BAX", onProgress, onError);
	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3, true));
	geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 4, true));
	geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1, true));

	particleSystem = new THREE.Points(geometry, shaderMaterial);
	scene.add(particleSystem);

	drawborder();
	settowns();
	setkks();
	setszs();
	setczs();
	setdpzs();
	setsize()
	window.addEventListener('resize', onWindowResize, false);
	container.addEventListener('mousedown', onDocumentMouseDown, false);
	container.addEventListener('mousemove', onDocumentMouseMove, false);
	container.addEventListener('mousewheel', onMouseWheel, false);
	setpoints();
	setlines();

	animate();
}

function loadgk(name) {
	var gkLoader = new THREE.MTLLoader();
	floormtlLoader.setPath('models/' + name + '/');
	floormtlLoader.setBaseUrl('models/' + name + '/');
	floormtlLoader.load(name + '.mtl', function(materials) {

		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('models/' + name + '/');
		objLoader.load(name + '.obj', function(object) {
			for(var i = 0; i < object.children.length; i++) {
				var child = object.children[i];
				object.children[i].material.side = THREE.DoubleSide;
			}
			scene.add(object);

		}, onProgress, onError);

	});
}

function Sprite(name, spriteMaterial1, spriteMaterial2, width, height) {
	this.sprite = new THREE.Sprite(spriteMaterial1);
	this.sprite.scale.set(width, height, 1.0);
	this.sprite.name = name;
	this.sprite.visible = false;
	this.material1 = spriteMaterial1
	this.material2 = spriteMaterial2
	this.width = width;
	this.height = height;
}

function makeTextSprite(name, message, fontsize, fontstyle, selectedfontcolor, selectedcolor, selectedborder, unselectedfontcolor, unselectedcolor, unselectedborder) {
	var material1 = drawmaterial(message, fontsize, fontstyle, selectedfontcolor, selectedcolor, selectedborder);
	var material2 = drawmaterial(message, fontsize, fontstyle, unselectedfontcolor, unselectedcolor, unselectedborder);

	sprite = new Sprite(name, material1.material, material2.material, material1.width, material1.height)
	return sprite;
}

function drawmaterial(message, fontsize, fontstyle, fontcolor, color, bordercolor) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	ctx.font = fontsize + "px " + fontstyle;
	var paddingborder = Math.floor(fontsize / 4);
	var paddingx = Math.floor(fontsize / 3);

	var paddingtop = Math.floor(fontsize / 4);
	var paddingtop = Math.floor(fontsize / 4);
	var paddingbottom = Math.floor(fontsize / 3);
	var arrowheight = Math.floor(fontsize / 2);
	var arrowhalfwidth = Math.floor(fontsize / 2);

	var partheight = paddingtop + fontsize + paddingbottom + paddingborder + arrowheight;

	var textwidth = ctx.measureText(message).width;
	var partwidth = textwidth + paddingx * 2 + paddingborder * 2;
	canvas.height = partheight * 2;
	canvas.width = partwidth;
	ctx.font = fontsize + "px " + fontstyle;
	ctx.lineWidth = Math.floor(fontsize / 5);
	ctx.fillStyle = color;
	ctx.strokeStyle = bordercolor;
	ctx.beginPath();
	ctx.moveTo(partwidth / 2, partheight);
	ctx.lineTo(partwidth / 2 - arrowhalfwidth, partheight - arrowheight);
	ctx.lineTo(paddingborder, partheight - arrowheight);
	ctx.lineTo(paddingborder, paddingborder);
	ctx.lineTo(partwidth - paddingborder, paddingborder);
	ctx.lineTo(partwidth - paddingborder, partheight - arrowheight);
	ctx.lineTo(partwidth / 2 + arrowhalfwidth, partheight - arrowheight);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.fillStyle = fontcolor;
	ctx.fillText(message, paddingborder + paddingx, fontsize + paddingborder + paddingtop);
	var texture = new THREE.Texture(canvas)
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false });
	var material = {
		material: spriteMaterial,
		width: canvas.width,
		height: canvas.height
	}
	console.log(material)
	return material;
}
var jjxs = 20757;
var rkxs = [];

function loadresultdata(url) {
	var xmldoc = loadxml(url);
	times = xmldoc.getElementsByTagName("ts");
	var innerstring = " <table cellpadding='0' cellspacing='0' border='1'><tr><th class='area'>地区</th><th>淹没面积（km<sup>2</sup>）</th><th>受灾人口（万人）</th><th>经济损失（万元）</th></tr>";
	var sdatas = xmldoc.getElementsByTagName("info")[0].getElementsByTagName("part");
	for(var i = 0; i < sdatas.length; i++) {
		var areaname = sdatas[i].getAttribute("n");
		rkxs[i] = sdatas[i].getAttribute("r");
		innerstring = innerstring + "<tr><td>" + areaname + "</td><td id='sarea" + i + "'></td><td id='srk" + i + "'></td><td id='sjj" + i + "'></td></tr>"
	}
	innerstring = innerstring + "</table>";
	document.getElementById("statistics").innerHTML = innerstring;
	document.getElementById("gkjsdata").innerHTML =  xmldoc.getElementsByTagName("info")[0].getElementsByTagName("st")[0].getAttribute("t");
	spw = xmldoc.getElementsByTagName("info")[0].getElementsByTagName("p")[0].getAttribute("w") - 1 + 1;
	xmldx = xmldoc.getElementsByTagName("info")[0].getElementsByTagName("p")[0].getAttribute("x") * tom;
	xmldz = xmldoc.getElementsByTagName("info")[0].getElementsByTagName("p")[0].getAttribute("z") * tom;
	scale = spw / pw * tom;
	datadtime = 0;
	datadtime = xmldoc.getElementsByTagName("info")[0].getElementsByTagName("dt")[0].getAttribute("t");
}

function selectchange(value) {
	stopline();
	closedialog()
	var url;
	gkdatas[currentgk].visible = false;
	switch(value) {
		case "TNT":
			currentgk = "TNT";
			url = 'models/TNTresult.xml';
			gkdatas[currentgk].visible = true;
			break;
		case "LWJ":
			currentgk = "LWJ";
			url = 'models/LWJresult.xml';
			gkdatas[currentgk].visible = true;
			break;
		case "YJQ":
			currentgk = "YJQ";
			url = 'models/YJQresult.xml';
			gkdatas[currentgk].visible = true;
			break;
		case "BAX":
			currentgk = "BAX";
			url = 'models/BAXresult.xml';
			gkdatas[currentgk].visible = true;
			break;
		case "XLXC":
			currentgk = "XLXC";
			url = 'models/XLXCresult.xml';
			gkdatas[currentgk].visible = true;
			break;
		case "DD":
			currentgk = "DD";
			url = 'models/DDresult.xml';
			gkdatas[currentgk].visible = true;
			break;
		case "MS":
			currentgk = "MS";
			url = 'models/MSresult.xml';
			gkdatas[currentgk].visible = true;
			break;
		case "SSSZ":
			currentgk = "SSSZ";
			url = 'models/SSresult.xml';
			gkdatas[currentgk].visible = true;
			break;
	}
	ymstop(true);
	document.getElementById("loadingdialog").className = "sdialog";
	setTimeout(function() { loadresultdata(url); }, 1);
}

function setbuff(ts) {
	var color = new THREE.Color();
	var innerpointcount = 0;
	var parts = ts.getElementsByTagName("p");
	for(var j = 0; j < parts.length; j++) {
		var part = parts[j];
		var num = part.getAttribute("n");
		var level = part.getAttribute("l");
		if(level != 0) {
			var box = getbox(num);
			for(var y = 0; y < lay; y++) {
				for(var x = box[0]; x < box[2]; x = x + toone) {
					for(var z = box[1]; z < box[3]; z = z + toone) {
						positions[3 * innerpointcount] = xmldx + x * scale;
						positions[3 * innerpointcount + 1] = y * 10;
						positions[3 * innerpointcount + 2] = xmldz + z * scale;
						if(showlevel) {
							colors[4 * innerpointcount + 3] = 1;
							switch(level - 1 + 1) {
								case 1:
									color.setRGB(127, 127, 255);
									break;
								case 2:
									color.setRGB(0, 0, 255);
									break;
								case 3:
									color.setRGB(0, 166, 166);
									break;
								case 4:
									color.setRGB(0, 255, 0);
									break;
								case 5:
									color.setRGB(255, 255, 0);
									break;
								case 6:
									color.setRGB(255, 0, 0);
									break;
							}
						} else {
							color.setRGB(50, 75, 255);
							colors[4 * innerpointcount + 3] = 0.5;
						}
						colors[4 * innerpointcount] = color.r;
						colors[4 * innerpointcount + 1] = color.g;
						colors[4 * innerpointcount + 2] = color.b;
						sizes[innerpointcount] = toone * scale * 6;
						innerpointcount++;
					}
				}
			}
		}
	}

	for(innerpointcount++; innerpointcount < particles; innerpointcount++) {
		positions[3 * innerpointcount] = 0;
		positions[3 * innerpointcount + 1] = 100000000;
		positions[3 * innerpointcount + 2] = 0;
		sizes[innerpointcount] = toone * scale * 4;
		color.setRGB(0, 0, 0);
		colors[4 * innerpointcount] = color.r;
		colors[4 * innerpointcount + 1] = color.g;
		colors[4 * innerpointcount + 2] = color.b;
		colors[4 * innerpointcount + 3] = 0.0;

	}
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	setsize()
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	for(var i = 0; i < waterlist.length; i++) {
		waterlist[i].material.uniforms.time.value += 1.0 / 60.0;
		waterlist[i].render();
	}
	if(playing) {
		ymupdate();
	}
	if(currentmodel == model.fly) {
		fly();
		if(camera.position.y < 600) {
			camera.position.y = 600;
		} else if(camera.position.y > 37000) {
			camera.position.y = 37000;
		}
		if(camera.position.x > 52211) {
			camera.position.x = 52211
		} else if(camera.position.x < -7979) {
			camera.position.x = -7979
		}
		if(camera.position.z > 70324) {
			camera.position.z = 70324
		} else if(camera.position.z < -5078) {
			camera.position.z = -5078
		}
	} else if(currentmodel == model.animate) {
		if(currentstate == state.play) {
			cameraanimate();
		}
		ptime = window.performance.now();
	} else if(currentmodel == model.zoom) {
		cameraanimate();
	}

	animateupdate();
}
var datadtime = 30;
var ctime = 0;
var speed = 5;
var pasttime = 0;

function ymupdate() {
	if(ctime < times.length) {
		var ts = times[ctime];
		setbuff(ts);
		tobar(times.length, ctime)
		var sdatas = ts.getElementsByTagName("i")[0].getElementsByTagName("s");
		for(var i = 0; i < sdatas.length; i++) {
			var areadata = sdatas[i].getAttribute("d");
			document.getElementById("sarea" + i).innerHTML = areadata;
			var jjsc = Math.floor((areadata - 1 + 1) * jjxs);
			document.getElementById("sjj" + i).innerHTML = jjsc;
			var jjsc = Math.floor((areadata - 1 + 1) * rkxs[i] * 100) / 100.0;
			document.getElementById("srk" + i).innerHTML = jjsc;
		}
		var timesring = gettime(datadtime * ctime);
		document.getElementById("pasttime").innerHTML = timesring;
	}
	if(!usingtimebar) {
		pasttime++;
		if(pasttime >= speed) {
			pasttime = 0;
			ctime++;
			if(ctime > times.length) {
				ctime = 0;
			}
		}
	}
	geometry.attributes.position.needsUpdate = true;
	geometry.attributes.customColor.needsUpdate = true;
	geometry.attributes.size.needsUpdate = true;

}

function loadxml(xml_name) {
	var xmlDoc;
	try {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); // Support IE 
	} catch(e) {
		try {
			// Support Firefox, Mozilla, Opera, etc 
			xmlDoc = document.implementation.createDocument("", "", null); // 创建一个空的 XML 文档对象。 
		} catch(e) {
			alert(e.message);
		}
	}
	// 加载XML文档 
	try {
		xmlDoc.async = false; // 关闭异步加载 
		xmlDoc.load(xml_name);
	} catch(e) {
		try {

			// alert(e.message) 如果浏览器是Chrome，则会catch这个异常：Object # (a Document) has no method "load"，所以，以下实现支持chrome加载XML文档（只是粗略的写下） 
			var xhr = new XMLHttpRequest();
			xhr.open("GET", xml_name, false);
			xhr.send(null);
			xmlDoc = xhr.responseXML.documentElement;
		} catch(e) {
			alert(e.message);
		}
	}
	document.getElementById("loadingdialog").className = "close";
	return xmlDoc;
}

function getbox(n) {
	var win = [0, 0, 0, 0];
	var path = [];
	var temp = n;

	while(temp > 0) {
		path.push((temp - 1) % 4);
		temp = Math.floor((temp - 1) / 4);
	}
	var count = path.length;
	for(var i = 1; i <= count; i++) {
		var data = path[count - i];
		win[0] = Math.floor(win[0] + cl * ((data % 2) / (Math.pow(2, i))));
		win[1] = Math.floor(win[1] + ro * (Math.floor(data / 2) / (Math.pow(2, i))));
	}
	win[2] = Math.floor(cl / Math.pow(2, count)) + win[0];
	win[3] = Math.floor(ro / Math.pow(2, count)) + win[1];
	return win;
}

function fly() {
	var delta = clock.getDelta(); // seconds.
	var moveDistance = 6000 * delta; // pixels per second
	var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
//	console.log(delta)

	// move forwards/backwards/left/right
	if(keyboard.pressed("W")) {
		camera.translateZ(-moveDistance);
	}
	if(keyboard.pressed("S")) {
		camera.translateZ(moveDistance);
	}
	if(keyboard.pressed("A")) {
		camera.translateX(-moveDistance);
	}
	if(keyboard.pressed("D")) {
		camera.translateX(moveDistance);
	}

	// rotate left/right/up/down
	if(keyboard.pressed("Q")) {
		pr.y = (pr.y + rotateAngle + 2 * Math.PI) % (2 * Math.PI);
	}
	if(keyboard.pressed("E")) {
		pr.y = (pr.y - rotateAngle + 2 * Math.PI) % (2 * Math.PI);
	}
	if(keyboard.pressed("F")) {
		pr.x = (pr.x - rotateAngle + 2 * Math.PI) % (2 * Math.PI);;
	}
	if(keyboard.pressed("R")) {
		pr.x = (pr.x + rotateAngle + 2 * Math.PI) % (2 * Math.PI);
	}

	if(keyboard.pressed("c")) {
		//document.getElementById("jumptotext").value = (pr.x + "," + pr.y + "," + camera.position.x + "," + camera.position.y + "," + camera.position.z);
		document.getElementById("jumptotext").value = (Math.floor(camera.position.x) + "," + Math.floor(camera.position.y) + "," + Math.floor(camera.position.z) + "," + pr.x + "," + pr.y);
	}
}

function onDocumentMouseDown(event) {
	document.getElementById("locationlist").className = "close";
	if(currentmodel == model.fly) {
		var selectedclick = false;
		if(event.button == 0) {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

			// find intersections

			// create a Ray with origin at the mouse position
			//   and direction into the scene (camera direction)
			var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
			projector.unprojectVector(vector, camera);
			var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

			// create an array containing all objects in the scene with which the ray intersects
			var intersects = ray.intersectObjects(currenttargets);
			// if there is one (or more) intersections
			if(intersects.length > 0) {
				selectedclick = true;
				var info = intersects[0].object.name.split("asdf");
			}
		}
		if(!selectedclick) {
			if(event.button == 0) {
				mousstate = mstate.left
			} else if(event.button == 1) {
				mousstate = mstate.middle
			} else if(event.button == 2) {
				mousstate = mstate.right
			}
			mouse2.x = event.clientX
			mouse2.y = event.clientY
			document.addEventListener('mouseup', onDocumentMouseUp, false);
			container.removeEventListener('mousedown', onDocumentMouseDown, false);
		}
	}
}

var oversprite = null;

function onDocumentMouseMove(event) {
	var moveDistance = 70;
	
	if(mousstate != mstate.none) {
		var dx = event.clientX - mouse2.x;
		var dy = event.clientY - mouse2.y;
		if(mousstate == mstate.middle) {
			var moveDistance = moveDistance * dy;
			camera.translateZ(-moveDistance);
		} else if(mousstate == mstate.right) {
			var moveXDistance = moveDistance / 2 * dx;
			var moveYDistance = moveDistance / 2 * dy;
			if(dx > 1 || dx < -1) {
				camera.translateX(-moveXDistance);
			}
			if(dy > 1 || dy < -1) {
				camera.translateY(moveYDistance);
			}
		} else if(mousstate == mstate.left) {
			console.log(mousstate)
			var rotateAngley = -(Math.PI / 720) * dx;
			var rotateAnglex = -(Math.PI / 720) * dy;
			if(dy > 1 || dy < -1) {
				pr.x = (pr.x + rotateAnglex + 2 * Math.PI) % (2 * Math.PI);
			}
			if(dx > 1 || dx < -1) {
				pr.y = (pr.y + rotateAngley + 2 * Math.PI) % (2 * Math.PI);
			}
		}
		mouse2.x = event.clientX
		mouse2.y = event.clientY
	} else if(currentsprites != null) {
		// update the mouse variable
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		// find intersections

		// create a Ray with origin at the mouse position
		//   and direction into the scene (camera direction)
		var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
		projector.unprojectVector(vector, camera);
		var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

		// create an array containing all objects in the scene with which the ray intersects
		var intersects = ray.intersectObjects(currenttargets);
		// if there is one (or more) intersections
		if(intersects.length > 0) {
			document.getElementById("ThreeJS").style.cursor = "pointer";
		} else {
			if(oversprite != null) {
				document.getElementById("ThreeJS").style.cursor = "default";
			}
		}
	}
}

function onDocumentMouseUp(event) {
	container.addEventListener('mousedown', onDocumentMouseDown, false);
	mousstate = mstate.none;
	document.addEventListener('mouseup', onDocumentMouseUp, false);
}
var pr = { x: 5.646, y: 3.2 }; //相机角度控制
function animateupdate() {
	var thisx = pr.x;
	var thisy = pr.y;
	if(thisx == (3 / 2) * Math.PI || thisx == (1 / 2) * Math.PI) {
		thisx = thisx + 0.000000001;
	}
	camera.lookAt(new THREE.Vector3(camera.position.x + Math.sin(thisy) * Math.cos(thisx), camera.position.y + Math.sin(thisx), camera.position.z + Math.cos(thisy) * Math.cos(thisx)));
	if(thisx < (3 / 2) * Math.PI && thisx > (1 / 2) * Math.PI) {
		camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI);
	}
//	for(var i = 0; i < spriteslist.length; i++) {
//
//		var vector = new THREE.Vector3(0, 0, 1);
//		projector.unprojectVector(vector, camera);
//		vector = vector.sub(camera.position)
//		var vector2 = new THREE.Vector3(spriteslist[i].sprite.position.x - camera.position.x, spriteslist[i].sprite.position.y - camera.position.y, spriteslist[i].sprite.position.z - camera.position.z);
//		//var distance = Math.sqrt(Math.pow(vector2.x, 2) + Math.pow(vector2.y, 2) + Math.pow(vector2.z, 2));
//		var distance = (vector.x * vector2.x + vector.y * vector2.y + vector.z * vector2.z) / Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
//		var s = distance / 1000;
//		spriteslist[i].sprite.scale.set(spriteslist[i].width * s, spriteslist[i].width * s, 1);
//	}
}

function onMouseWheel(event) {
	if(currentmodel == model.fly) {
		var delta = 0;
		if(event.wheelDelta != undefined) {
			// WebKit / Opera / Explorer 9
			delta = event.wheelDelta;
		} else if(event.detail != undefined) {
			// Firefox
			delta = -event.detail;
		}
		var moveDistance = 15 * delta;
		camera.translateZ(-moveDistance);
	}
}

function drawborder() {
	var linexml = loadxml("models/border.xml");

	var info = linexml.getElementsByTagName("inf")[0];
	var bw = info.getAttribute("w") - 1 + 1
	var bscale = bw * tom / 3308;
	var bdx = info.getAttribute("x") * tom;
	var bdz = info.getAttribute("z") * tom;
	var lines = linexml.getElementsByTagName("l");
	for(var i = 0; i < lines.length; i++) {
		var vertices = [];
		var line = lines[i];
		var isout = (line.getAttribute("t") == "o")
		var points = line.getElementsByTagName("p");
		for(var j = 0; j < points.length; j++) {
			var point = points[j];
			var x = point.getAttribute("x") * bscale + bdx;
			var z = point.getAttribute("y") * bscale + bdz;
			vertices.push(new THREE.Vector3(x, 40, z));
		}
		Spline = new THREE.CatmullRomCurve3(vertices);
		Spline.closed = false;

		var color
		var width;
		var needtoclose;
		if(isout) {
			color = 0x00ffff;
			width = 45;
			needtoclose = true;
		} else {
			color = 0xff00ff;
			width = 35;
			needtoclose = false;
		}
		var material = new THREE.MeshBasicMaterial({ color: color });
		var lamber = new THREE.MeshBasicMaterial({ color: color });
		var tube = new THREE.TubeGeometry(Spline, points.length * 9, width, 6, needtoclose);
		var line = THREE.SceneUtils.createMultiMaterialObject(tube, [lamber, material]);

		line.position.y = 10;

		scene.add(line);
	}
}
var tlines = [];

function createtline(url) {
	var line = new THREE.BufferGeometry();
	var color = new THREE.Color(0xffffff);
	var linexml = loadxml(url);
	var linepoints = linexml.getElementsByTagName("p");
	var pointcount = linepoints.length
	var linegeometry = createGeometry();

	var linepositions = new Float32Array(pointcount * linegeometry.faces.length * 3 * 3);
	var linenormals = new Float32Array(pointcount * linegeometry.faces.length * 3 * 3);
	var linecolors = new Float32Array(pointcount * linegeometry.faces.length * 3 * 3);
	linegeometry = null;
	for(var i = 0; i < pointcount; i++) {
		if(linegeometry == null) {
			linegeometry = createGeometry();
			linegeometry.rotateY(-linepoints[i].getAttribute("r"));
		}
		linegeometry.translate(linepoints[i].getAttribute("x"), 50, linepoints[i].getAttribute("z"));
		linegeometry.faces.forEach(function(face, index) {

			var cur_element = i * linegeometry.faces.length + index;
			linepositions[cur_element * 9 + 0] = linegeometry.vertices[face.a].x;
			linepositions[cur_element * 9 + 1] = linegeometry.vertices[face.a].y;
			linepositions[cur_element * 9 + 2] = linegeometry.vertices[face.a].z;
			linepositions[cur_element * 9 + 3] = linegeometry.vertices[face.b].x;
			linepositions[cur_element * 9 + 4] = linegeometry.vertices[face.b].y;
			linepositions[cur_element * 9 + 5] = linegeometry.vertices[face.b].z;
			linepositions[cur_element * 9 + 6] = linegeometry.vertices[face.c].x;
			linepositions[cur_element * 9 + 7] = linegeometry.vertices[face.c].y;
			linepositions[cur_element * 9 + 8] = linegeometry.vertices[face.c].z;
			linenormals[cur_element * 9 + 0] = face.normal.x;
			linenormals[cur_element * 9 + 1] = face.normal.y;
			linenormals[cur_element * 9 + 2] = face.normal.z;
			linenormals[cur_element * 9 + 3] = face.normal.x;
			linenormals[cur_element * 9 + 4] = face.normal.y;
			linenormals[cur_element * 9 + 5] = face.normal.z;
			linenormals[cur_element * 9 + 6] = face.normal.x;
			linenormals[cur_element * 9 + 7] = face.normal.y;
			linenormals[cur_element * 9 + 8] = face.normal.z;
			linecolors[cur_element * 9 + 0] = color.r;
			linecolors[cur_element * 9 + 1] = color.g;
			linecolors[cur_element * 9 + 2] = color.b;
			linecolors[cur_element * 9 + 3] = color.r;
			linecolors[cur_element * 9 + 4] = color.g;
			linecolors[cur_element * 9 + 5] = color.b;
			linecolors[cur_element * 9 + 6] = color.r;
			linecolors[cur_element * 9 + 7] = color.g;
			linecolors[cur_element * 9 + 8] = color.b;
		});
		linegeometry = null
	}
	line.addAttribute('position', new THREE.BufferAttribute(linepositions, 3));
	line.addAttribute('normal', new THREE.BufferAttribute(linenormals, 3));
	line.addAttribute('color', new THREE.BufferAttribute(linecolors, 3));
	line.computeBoundingSphere();

	var linemesh = new THREE.Mesh(line, line_material1);
	tlines.push(linemesh);
	scene.add(tlines[tlines.length - 1]);
}

function createGeometry() {
	var triangleShape = new THREE.Shape(); // 
	var x = 0,
		y = 0;
	triangleShape.moveTo(x + 8, y);
	triangleShape.lineTo(x - 2, y - 6);
	triangleShape.lineTo(x - 2, y - 3);
	triangleShape.lineTo(x - 10, y - 3);
	triangleShape.lineTo(x - 10, y + 3);
	triangleShape.lineTo(x - 2, y + 3);
	triangleShape.lineTo(x - 2, y + 6);
	triangleShape.lineTo(x + 8, y); // close path
	var extrudeSettings = {
		amount: 2,
		bevelEnabled: true,
		bevelSegments: 1,
		steps: 2,
		bevelSize: 1,
		bevelThickness: 1
	};
	var geom = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
	geom.rotateX(Math.PI / 2);
	//geom.rotateY(-Math.PI / 2);
	geom.scale(40, 40, 40);
	return geom;
}
var spriteslist = []

function settown(townname, townx, townz, cx, cy, cz, rx, ry) {
	townspritematerial = drawmaterial(townname, 30, 'SimHei', 'rgba(255,0,0,1.0)', 'rgba(220,255,255,0.8)', 'rgba(255,255,200,0.9)');
	var spritetown = new THREE.Sprite(townspritematerial.material);
	spritetown.scale.set(townspritematerial.width, townspritematerial.height, 1.0);
	spritetown.position.set(townx, 150, townz);
	towncamerpoints[townname] = new camerapoint(cx, cy, cz, rx, ry);
	spriteslist.push({ sprite: spritetown, width: townspritematerial.width, height: townspritematerial.height });
	scene.add(spritetown);
}

function setkk(name, x, z) {
	var spritematerial = drawmaterial(name, 20, 'SimHei', 'rgba(0,50,255,1.0)', 'rgba(220,255,255,0.8)', 'rgba(150,255,255,0.9)');
	var spritekk = new THREE.Sprite(spritematerial.material);
	spritekk.scale.set(spritematerial.width, spritematerial.height, 1.0);
	spriteslist.push({ sprite: spritekk, width: spritematerial.width, height: spritematerial.height })
	spritekk.position.set(x, 150, z);
	scene.add(spritekk);
}

var sssz = "",
	dlsz = "",
	lssz = "",
	gcsz = "",
	dzsz = "",
	xqsz = "",
	jjsz = "";
var sscz = "",
	dlcz = "",
	lscz = "",
	gccz = "",
	dzcz = "",
	xqcz = "",
	jjcz = "";
var ssdpz = "",
	dldpz = "",
	lsdpz = "",
	gcdpz = "",
	dzdpz = "",
	xqdpz = "",
	jjdpz = "";

function adddata(townindex, id, name, x, z, size, type) {
	var data = "<li onclick='show" + type + "(" + id + ")'  onmouseover=\" mousehovertarget('" + townindex + "','" + id + "')\" onmouseout=\"mouseouttarget('" + townindex + "','" + id + "')\" ><p>" + name + "</p></li>";
	if(sprites[townindex] == undefined || sprites[townindex] == null) {
		sprites[townindex] = [];
	}
	var sprite = makeTextSprite(id, name, size, 'SimHei', 'rgba(0,0,0,1.0)', 'rgba(220,255,255,0.8)', 'rgba(100,255,170,0.9)', 'rgba(0,0,0,1.0)', 'rgba(200,230,255,0.9)', 'rgba(100,100,255,1.0)');
	sprite.sprite.position.set(x, 100, z);
	sprites[townindex][id.toString()] = sprite;
	spriteslist.push({ sprite: sprite.sprite, width: sprite.width, height: sprite.height })
	scene.add(sprite.sprite);
	return data;
}

function setsz(id, name, town, x, z) {
	switch(town) {
		case 'ss':
			var townindex = "1";
			sssz = sssz + adddata(townindex, id, name, x, z, 20, "sz");
			break;
		case 'dz':
			var townindex = "2";
			dzsz = dzsz + adddata(townindex, id, name, x, z, 20, "sz");
			break;
		case 'gc':
			var townindex = "3";
			gcsz = gcsz + adddata(townindex, id, name, x, z, 20, "sz");
			break;
		case 'jj':
			var townindex = "4";
			jjsz = jjsz + adddata(townindex, id, name, x, z, 20, "sz");
			break;
		case 'xq':
			var townindex = "5";
			xqsz = xqsz + adddata(townindex, id, name, x, z, 20, "sz");
			break;
		case 'dl':
			var townindex = "6";
			dlsz = dlsz + adddata(townindex, id, name, x, z, 20, "sz");
			break;
		case 'ls':
			var townindex = "7";
			lssz = lssz + adddata(townindex, id, name, x, z, 20, "sz");
			break;
	}
}

function setcz(id, name, town, x, z) {
	switch(town) {
		case 'ss':
			var townindex = "8";
			sscz = sscz + adddata(townindex, id, name, x, z, 20, "cz");
			break;
		case 'dz':
			var townindex = "9";
			dzcz = dzcz + adddata(townindex, id, name, x, z, 20, "cz");
			break;
		case 'gc':
			var townindex = "10";
			gccz = gccz + adddata(townindex, id, name, x, z, 20, "cz");
			break;
		case 'jj':
			var townindex = "11";
			jjcz = jjcz + adddata(townindex, id, name, x, z, 20, "cz");
			break;
		case 'xq':
			var townindex = "12";
			xqcz = xqcz + adddata(townindex, id, name, x, z, 20, "cz");
			break;
		case 'dl':
			var townindex = "13";
			dlcz = dlcz + adddata(townindex, id, name, x, z, 20, "cz");
			break;
		case 'ls':
			var townindex = "14";
			lscz = lscz + adddata(townindex, id, name, x, z, 20, "cz");
			break;
	}
}

function setdpz(id, name, town, x, z) {
	switch(town) {
		case 'ss':
			var townindex = "15";
			ssdpz = ssdpz + adddata(townindex, id, name, x, z, 20, "dpz");
			break;
		case 'dz':
			var townindex = "16";
			dzdpz = dzdpz + adddata(townindex, id, name, x, z, 20, "dpz");
			break;
		case 'gc':
			var townindex = "17";
			gcdpz = gcdpz + adddata(townindex, id, name, x, z, 20, "dpz");
			break;
		case 'jj':
			var townindex = "18";
			jjdpz = jjdpz + adddata(townindex, id, name, x, z, 20, "dpz");
			break;
		case 'xq':
			var townindex = "19";
			xqdpz = xqdpz + adddata(townindex, id, name, x, z, 20, "dpz");
			break;
		case 'dl':
			var townindex = "20";
			dldpz = dldpz + adddata(townindex, id, name, x, z, 20, "dpz");
			break;
		case 'ls':
			var townindex = "21";
			lsdpz = lsdpz + adddata(townindex, id, name, x, z, 20, "dpz");
			break;
	}
}