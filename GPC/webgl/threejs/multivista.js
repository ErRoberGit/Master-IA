/**
 * MultiVista.js
 * Visualiza en cuatro vistas la misma escena
 *
 */

var renderer, scene, camera;
var alzado, planta, perfil;

const L = 4;

var cameraControls;

init();
loadScene();
render();

function init() {
    //Inicializar Threejs
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x0000AA));
    renderer.autoClear = false;
    document.getElementById('container').appendChild(renderer.domElement);

    scene = new THREE.Scene();

    setCameras(window.innerWidth/window.innerHeight);

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0,0,0);
    
    window.addEventListener('resize', updateAspectRatio);
}

function setCameras(ar){
    //Configurar planta, alzado, perfil y perspectiva
    var camaraOrtografica;

    if(ar<1){
      camaraOrtografica = new THREE.OrthographicCamera( -L, L, L/ar, -L/ar, -1, 100);
    }
    else{
      camaraOrtografica = new THREE.OrthographicCamera( -L*ar, L*ar, L, -L, -1, 100);
    }

    camaraOrtografica.lookAt(new THREE.Vector3(0, 0, 0));

    alzado = camaraOrtografica.clone();
    alzado.position.set(0,0,L);
    alzado.lookAt(new THREE.Vector3(0, 0, 0));

    perfil = camaraOrtografica.clone();
    perfil.position.set(L,0,0);
    perfil.lookAt(new THREE.Vector3(0, 0, 0));

    planta = camaraOrtografica.clone();
    planta.position.set(0,L,0);
    planta.up = new THREE.Vector3(0,0,-1);
    planta.lookAt(new THREE.Vector3(0, 0, 0));

    var camaraPerspectiva = new THREE.PerspectiveCamera(75, ar, 0.1, 100);
    camaraPerspectiva.position.set(1,2,10);
    camaraPerspectiva.lookAt(new THREE.Vector3(0,0,0));

    camera = camaraPerspectiva.clone();

    scene.add(camera);
    scene.add(alzado);
    scene.add(perfil);
    scene.add(planta);
}

function loadScene() {
    //Carga la escena
    
    var material = new THREE.MeshBasicMaterial({color:'yellow', wireframe: true});

    var geocubo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    //Array de cubos
    for(var i=0; i < 5; i++){
      var cubo = new THREE.Mesh(geocubo, material);
      cubo.position.set(-2+i, 0, 0);
      scene.add(cubo);
    }
    scene.add(new THREE.AxesHelper(2));

    renderer.domElement.addEventListener('dblclick', rotateCube);
}

function rotateCube(event){
    //Girar un quinto de vuelta el cubo que se ha clickado
    var x = event.clientX;
    var y = event.clientY;

    var derecha = false; 
    var abajo = false;

    var cam = null;

    if(x>window.innerWidth/2){
      x -= window.innerWidth/2;
      derecha = true;
    }

    if(y>window.innerHeight/2){
      y -= window.innerHeight/2;
      abajo = true;
    }

    if(derecha){
      if(abajo){
        cam = camera;
      }
      else{
        cam = perfil;
      }
    }
    else{
      if(abajo){
        cam = planta;
      }
      else{
        cam = alzado;
      }
    }

    x = (x*4/window.innerWidth)-1;
    y = -(y*4/window.innerHeight)+1;

    var rayo = new THREE.Raycaster();

    rayo.setFromCamera(new THREE.Vector2(x, y), cam);

    var intersecciones = rayo.intersectObjects(scene.children);

    if(intersecciones.length > 0){
      intersecciones[0].object.rotation.x += Math.PI/5;
    }
}

function updateAspectRatio(){
    //Ajustar la cámara y el viewport a las nuevas dimensiones del canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
    var aspectRatio = window.innerWidth/window.innerHeight;

    camera.aspect = aspectRatio;

    if(aspectRatio<1){
      alzado.left = perfil.left = planta.left = -L;
      alzado.right = perfil.right = planta.right = L;
      alzado.top = perfil.top = planta.top = L/aspectRatio;
      alzado.bottom = perfil.bottom = planta.bottom = -L/aspectRatio;
    }
    else{
      alzado.left = perfil.left = planta.left = -L*aspectRatio;
      alzado.right = perfil.right = planta.right = L*aspectRatio;
      alzado.top = perfil.top = planta.top = L;
      alzado.bottom = perfil.bottom = planta.bottom = -L;
    }

    alzado.updateProjectionMatrix();
    perfil.updateProjectionMatrix();
    planta.updateProjectionMatrix();
    camera.updateProjectionMatrix();
}

function update(){
    
}

function render(){
    requestAnimationFrame(render);
    update();
    renderer.clear();
    
    renderer.setViewport(0, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
    renderer.render(scene, planta);
    
    renderer.setViewport(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
    renderer.render(scene, camera);

    renderer.setViewport(0, 0, window.innerWidth/2, window.innerHeight/2);
    renderer.render(scene, alzado);

    renderer.setViewport(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
    renderer.render(scene, perfil);
}

