var container;
var heartShape;

var camera, scene, renderer;

var group;

var scale = 1;
var targetRotation = 0.25;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;

initHeart();

function initHeart() {

    container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 150, 500);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff, 0.8);
    camera.add(light);
    group = new THREE.Group();
    group.position.y = 50;
    scene.add(group);

    function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
        // extruded shape
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color}));
        mesh.position.set(x, y, z /*- 75*/);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        group.add(mesh);
    }

    // Heart
    var x = 25, y = -25;
    heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
    heartShape.moveTo(x + 25, y + 25);
    heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
    heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
    heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
    heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
    heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
    heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);
    var extrudeSettings = {
        amount: 8,
        bevelEnabled: true,
        bevelSegments: 250,
        steps: 1,
        bevelSize: 25,
        bevelThickness: 1
    };
    // addShape( shape, color, x, y, z, rx, ry,rz, s );
    addShape(heartShape, extrudeSettings, 0xf00000, 60, 100, 0, 0, 0, Math.PI, 1);


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // document.addEventListener('mousedown', onDocumentMouseDown, false);
    // document.addEventListener('touchstart', onDocumentTouchStart, false);
    // document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}






/**
 * our figures
 * @type {number}
 */
// bpm = 60;
// amplitude = 25%;
// volume = 0.3;