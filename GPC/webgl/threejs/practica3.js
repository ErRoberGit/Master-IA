/**
 * Grafo.js
 * Carga un grafo de escena en Threejs y lo visualiza
 *
 */

var renderer, scene, camera;

var planta;

const L = 200;

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
    cameraControls.target.set(0,110,0);

    window.addEventListener('resize', updateAspectRatio);

}

function setCameras(ar){
  var camaraOrtografica;

  if(ar<1){
    camaraOrtografica = new THREE.OrthographicCamera( -L, L, L/ar, -L/ar, -1, 100000);
  }
  else{
    camaraOrtografica = new THREE.OrthographicCamera( -L*ar, L*ar, L, -L, -1, 100000);
  }

  camaraOrtografica.lookAt(new THREE.Vector3(0, 0, 0));

  planta = camaraOrtografica.clone();
  planta.position.set(0,L,0);
  planta.up = new THREE.Vector3(0,0,-1);
  planta.lookAt(new THREE.Vector3(0, 0, 0));

  var camaraPerspectiva = new THREE.PerspectiveCamera(75, ar, 0.1, 100000);
  camaraPerspectiva.position.set(100,210,150);
  camaraPerspectiva.lookAt(new THREE.Vector3(0,110,0));

  camera = camaraPerspectiva.clone();

  scene.add(camera);
  scene.add(planta);
}

function loadScene() {
    //Carga la escena
    var matRobot = new THREE.MeshBasicMaterial({color:'red', wireframe: true});
    var geoBaseRobot = new THREE.CylinderGeometry(50, 50, 15, 32);
    var geoEje = new THREE.CylinderGeometry(20, 20, 18, 32);
    var geoEsparrago = new THREE.BoxGeometry(18, 120, 12);
    var geoRotula = new THREE.SphereGeometry(20, 30, 15);
    var geoDisco = new THREE.CylinderGeometry(22, 22, 6, 32);
    var geoNervios = new THREE.BoxGeometry(4,80,4);
    var geoMano = new THREE.CylinderGeometry(15, 15, 40, 32);
    var geoPinza = new THREE.Geometry();
    geoPinza.vertices.push(
        new THREE.Vector3(0, -8, -10), //0
        new THREE.Vector3(19, -8, -10), //1
        new THREE.Vector3(0, -8, 10), //2
        new THREE.Vector3(19, -8, 10), //3
        new THREE.Vector3(0, -12, -10), //4
        new THREE.Vector3(19, -12, -10), //5
        new THREE.Vector3(0, -12, 10), //6
        new THREE.Vector3(19, -12, 10), //7
        new THREE.Vector3(38, -8, -5), //8
        new THREE.Vector3(38, -12, -5), //9
        new THREE.Vector3(38, -8, 5), //10
        new THREE.Vector3(38, -12, 5), //11
    );
    geoPinza.faces.push(
        new THREE.Face3(0, 3, 2),
        new THREE.Face3(0, 1, 3),
        new THREE.Face3(1, 7, 3),
        new THREE.Face3(1, 5, 7),
        new THREE.Face3(5, 6, 7),
        new THREE.Face3(5, 4, 6),
        new THREE.Face3(4, 2, 6),
        new THREE.Face3(4, 0, 2),
        new THREE.Face3(2, 7, 6),
        new THREE.Face3(2, 3, 7),
        new THREE.Face3(4, 1, 0),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(1, 10, 3),
        new THREE.Face3(1, 8, 10),
        new THREE.Face3(8, 11, 10),
        new THREE.Face3(8, 9, 11),
        new THREE.Face3(9, 7, 11),
        new THREE.Face3(9, 5, 7),
        new THREE.Face3(3, 11, 7),
        new THREE.Face3(3, 10, 11),
        new THREE.Face3(5, 8, 1),
        new THREE.Face3(5, 9, 8),
    );
    
    var baseRobot = new THREE.Mesh(geoBaseRobot, matRobot);
    baseRobot.position.set(1.5, 0, 0);

    var eje = new THREE.Mesh(geoEje, matRobot);
    eje.rotation.x = Math.PI/2;

    var esparrago = new THREE.Mesh(geoEsparrago, matRobot);
    esparrago.position.set(0, 60, 0);

    var rotula = new THREE.Mesh(geoRotula, matRobot);
    rotula.position.set(0, 120, 0);

    var disco = new THREE.Mesh(geoDisco, matRobot);

    var nervio1 = new THREE.Mesh(geoNervios, matRobot);
    nervio1.position.set(8,40,4);

    var nervio2 = new THREE.Mesh(geoNervios, matRobot);
    nervio2.position.set(8,40,-4);

    var nervio3 = new THREE.Mesh(geoNervios, matRobot);
    nervio3.position.set(-8,40,4);

    var nervio4 = new THREE.Mesh(geoNervios, matRobot);
    nervio4.position.set(-8,40,-4);

    var mano = new THREE.Mesh(geoMano, matRobot);
    mano.rotation.x = Math.PI/2;
    mano.position.set(0,80,0);

    var pinzaI = new THREE.Mesh(geoPinza, matRobot);
    var pinzaD = new THREE.Mesh(geoPinza, matRobot);
    pinzaD.position.set(0, 20, 0);

    brazo = new THREE.Object3D();

    antebrazo = new THREE.Object3D();
    antebrazo.position.set(0, 120, 0);
    
    robot = new THREE.Object3D();
    
    mano.add(pinzaI);
    mano.add(pinzaD);
    
    antebrazo.add(mano);
    antebrazo.add(nervio1);
    antebrazo.add(nervio2);
    antebrazo.add(nervio3);
    antebrazo.add(nervio4);
    antebrazo.add(disco);
    
    brazo.add(antebrazo);
    brazo.add(eje);
    brazo.add(esparrago);
    brazo.add(rotula);
    
    baseRobot.add(brazo);

    robot.add(baseRobot);
    
    scene.add(robot);

    //Añadimos un suelo
    var geoSuelo = new THREE.PlaneGeometry(1000, 1000, 15, 15);
    var suelo = new THREE.Mesh(geoSuelo, matRobot);
    suelo.rotateX(-Math.PI / 2);
    scene.add(suelo);
}

function updateAspectRatio(){
  //Ajustar la cámara y el viewport a las nuevas dimensiones del canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
  var aspectRatio = window.innerWidth/window.innerHeight;

  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
}

function update()
{
}

function render(){
    requestAnimationFrame(render);
    update();
    renderer.clear();

    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    
    aspectRatio = window.innerWidth/window.innerHeight;
    if(aspectRatio<1){
      renderer.setViewport(0, 0, window.innerWidth/4, window.innerWidth/4);
    }
    else{
      renderer.setViewport(0, 0, window.innerHeight/4, window.innerHeight/4);
    }
    renderer.render(scene, planta);

}

