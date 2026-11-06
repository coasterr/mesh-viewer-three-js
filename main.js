// GLOBAL VARIABLES
	const meshesArray = ["box", "capsule", "triangle", "monkey"]; // array for each mesh used
	let selectedMesh = 0; // a number value which represents the mesh that is currently selected
	let wireframeOn = false; // boolean that triggers wireframe mode
	let colorHex = "#ffffff"; // color value in HEX, default set to default color

// SETUP TITLE AND DESCRIPTION
	// Init a container for page information
	const pageContainer = document.createElement("div");
	// Stylize & append
	pageContainer.style.padding = "4px 0 0 4px";
	document.body.append(pageContainer);

	// Init page title
	const title = document.createElement("p");
	// Stylize & append
	title.innerHTML = 'A <a href="https://threejs.org/" target="_blank">three.js</a> mesh viewer';
	title.style.fontSize = "24px";
	title.style.margin = "0 0 4px 0";
	pageContainer.append(title);

	// Init description
	const description = document.createElement("p");
	// Stylize & append
	description.innerHTML = 'This project was used to study how three.js can be used to render 3D objects on a website. Code was borrowed from three.js\'s official manual under the "<a href="https://threejs.org/manual/#en/creating-a-scene" target="_blank">Getting Started</a>" section to get things set up.<br>Multiple options are below to play around with three.js, modify them to see what they do!';
	description.style.fontSize = "16px";
	description.style.margin = "0";
	pageContainer.append(description);

// SETUP INPUT OPTIONS
	// Init a container for organizating user inputs
	const optionsContainer = document.createElement("div");
	// Stylize & append
	optionsContainer.style.display = "flex";
	optionsContainer.style.flexDirection = "row";
	optionsContainer.style.gap = "32px";
	optionsContainer.style.margin = "0 0 0 4px";
	document.body.append(optionsContainer);

// MESH SELECTION
	// Init a container for text & slider
	const meshContainer = document.createElement("div");
	// Stylize & append
	meshContainer.style.display = "grid";
	meshContainer.style.flexDirection = "column";
	meshContainer.style.width = "165px"; // fixed width so changing text doesn't resize the slider
	optionsContainer.append(meshContainer);

	// Init text to show which mesh has been selected
	const selectedMeshText = document.createElement("p");
	// Stylize & append
	selectedMeshText.textContent = "Selected mesh: " + meshesArray[selectedMesh];
	selectedMeshText.style.fontSize = "16px";
	meshContainer.append(selectedMeshText);

	// Init slider input element
	const meshSlider = document.createElement("input");
	// Select type, ranges & append
	meshSlider.type = "range";
	meshSlider.min = 0;
	meshSlider.max = 3;
	meshSlider.value = 0;
	meshContainer.append(meshSlider);

	// Turns the selectedMesh into a number value and changes the array
	function meshSliderHandler() {
		selectedMesh = Number(meshSlider.value);
		selectedMeshText.textContent = "Selected mesh: " + meshesArray[selectedMesh];
		updateMeshVisibility();
	}

// Listen for on input for meshSlider and run the meshSliderHandler function if input detected.
meshSlider.addEventListener("input", meshSliderHandler);

// WIREFRAME TOGGLE
	// Init a container for text & checkbox
	const wireframeContainer = document.createElement("div");
	// Stylize & append
	wireframeContainer.style.display = "grid";
	wireframeContainer.style.flexDirection = "column";
	wireframeContainer.style.width = "130px"; // fixed width so wireframeCheckbox doesn't shift things
	optionsContainer.append(wireframeContainer);

	// Init text to show if wireframe has been toggled on/off
	const wireframeToggledText = document.createElement("p");
	// Stylize & append
	wireframeToggledText.textContent = "Wireframe on: " + wireframeOn;
	wireframeToggledText.style.fontSize = "16px";
	wireframeContainer.append(wireframeToggledText);

	// Init checkbox input element
	const wireframeCheckbox = document.createElement("input");
	// Select type & append
	wireframeCheckbox.type = "checkbox";
	wireframeContainer.append(wireframeCheckbox);

	// Toggles wireframe value & changes text
	function wireframeToggleHandler() {
		wireframeOn = !wireframeOn;
		wireframeToggledText.textContent = "Wireframe on: " + wireframeOn;
		material.wireframe = !material.wireframe;
	}

// Listen for on input for wireframeCheckbox and run the wireframeToggleHandler function if input detected.
wireframeCheckbox.addEventListener("input", wireframeToggleHandler);
	
// MESH COLOR
	// Init a container for text & color picker
	const meshColorContainer = document.createElement("div");
	// Stylize & append
	meshColorContainer.style.display = "grid";
	meshColorContainer.style.flexDirection = "column";
	optionsContainer.append(meshColorContainer);

	// Init text to show which color is chosen
	const meshColorText = document.createElement("p");
	// Stylize & append
	meshColorText.textContent = "Mesh Color chosen: " + colorHex;
	meshColorText.style.fontSize = "16px";
	meshColorContainer.append(meshColorText);

	// Init color picker input
	const meshColorPicker = document.createElement("input");
	// Select type & append
	meshColorPicker.type = "color";
	meshColorPicker.value = "#ffffff";
	meshColorContainer.append(meshColorPicker);

	// Changes the mesh color & text
	function colorPickerHandler() {
		material.color.set(meshColorPicker.value);
		colorHex = "#" + material.color.getHexString();
		meshColorText.textContent = "Mesh Color chosen: " + colorHex;
	}

// Listen for on input for meshColorPicker and run the colorPickerHandler function if input detected.
meshColorPicker.addEventListener("input", colorPickerHandler);

// RANDOMIZE
	// Init a container for text & button
	const randomizeContainter = document.createElement("div");
	// Stylize & append
	randomizeContainter.style.display = "grid";
	randomizeContainter.style.flexDirection = "column";
	optionsContainer.append(randomizeContainter);

	// Init text to tell user what the button does
	const randomizeText = document.createElement("p");
	// Stylize & append
	randomizeText.textContent = "Randomize all options!";
	randomizeText.style.fontSize = "16px";
	randomizeContainter.append(randomizeText);

	// Init button input
	const randomizeButton = document.createElement("input");
	// Set type, value & append
	randomizeButton.type = "button";
	randomizeButton.value = "No turning back..";
	randomizeContainter.append(randomizeButton);

	// Randomizes the selected mesh, wireframe toggle, and mesh color in one function
	function randomizeHandler() {
		// Selected mesh randomizer
		// Randomize a number between 0-3
		selectedMesh = Math.floor(Math.random() * 4);
		// Change text
		selectedMeshText.textContent = "Selected mesh: " + meshesArray[selectedMesh];
		// Change slider value
		meshSlider.value = selectedMesh
		updateMeshVisibility();

		// Wireframe randomizer
		// Randomize a boolean between true and false (0-1)
		wireframeOn = Boolean(Math.floor(Math.random() * 2));
		// Change Text
		wireframeToggledText.textContent = "Wireframe on: " + wireframeOn;
		// Change checkbox value
		wireframeCheckbox.checked = wireframeOn;
		// Change material.wireframe
		if (wireframeOn === true) {
			material.wireframe = true;
		} else {
			material.wireframe = false;
		}

		// Mesh color randomizer
		// Store a randomcolor generated from RGB values via three.js
		const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
		// Copy randomColor to material.color
		material.color.copy(randomColor);
		// Use randomColor for colorHex
		colorHex = "#" + randomColor.getHexString();
		// Change text
		meshColorText.textContent = "Mesh Color chosen: " + colorHex;
		// Change color picker value
		meshColorPicker.value = colorHex;
	}

// Listen for on input for meshSlider and run the meshSliderHandler function if input detected.
randomizeButton.addEventListener("click", randomizeHandler);

// THREE.JS CODE
	// three.js scene, camera, mesh, and rendering creation
	// Code is borrowed from https://threejs.org/manual/#creating-a-scene with some modifications
	import * as THREE from 'three';

	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	// Creates a scene and a camera
	// The camera properites from left to right are FOV, aspect ratio, and clipping plane distances with the values 0.1 and 1000 (near and far)
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 70, 1, 0.1, 1000 );

	// Creates the renderer using a popular API, WebGL
	const renderer = new THREE.WebGLRenderer();
	// Sets the size of the image (hard coded to 400 by 400 and can be adjusted via sliders)
	renderer.setSize( 800, 800 );
	renderer.setAnimationLoop( animate );
	renderer.domElement.style.margin = "4px";
	document.body.appendChild( renderer.domElement );

	// Creates a shared material (using DoubleSide so the triangle which is flat will be visible from behind)
	const material = new THREE.MeshBasicMaterial( { color: colorHex, side: THREE.DoubleSide } );

	// Creates the meshes
	const box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), material );
	const capsule = new THREE.Mesh( new THREE.CapsuleGeometry( 0.5, 1, 4, 16 ), material );
	const triangle = new THREE.Mesh( new THREE.CircleGeometry( 1, 3 ), material ); // a circle with 3 segments is a triangle
	// Add meshes to scene
	scene.add( box, capsule, triangle );

	// Same order as meshesArray, the monkey (index 3) is filled in once the model loads
	const meshObjects = [ box, capsule, triangle, null ];

	// Shows only the selected mesh and hides the rest
	function updateMeshVisibility() {
		meshObjects.forEach( function ( obj, i ) {
			if ( obj ) obj.visible = ( i === selectedMesh );
		} );
	}

	updateMeshVisibility();

	// Adjust camera position away from mesh
	camera.position.z = 2.5;

	// Rotate meshes
	function animate( time ) {
		meshObjects.forEach( function ( obj ) {
			if ( obj ) {
				obj.rotation.x = time / 2000;
				obj.rotation.y = time / 2000;
			}
		} );

		renderer.render( scene, camera );
	}

	// Load custom monkey mesh from the public folder
	const loader = new GLTFLoader();

	// Loads file inside of public folder
	loader.load( 'public/monkey.glb', function ( gltf ) {
		const monkey = gltf.scene;

		monkey.traverse( function ( child ) {
			if ( child.isMesh ) child.material = material; // reuse the shared material
		} );

		scene.add( monkey );
		meshObjects[3] = monkey; // slot into the 4th position
		updateMeshVisibility();  // hides it unless it's already selected
	} );