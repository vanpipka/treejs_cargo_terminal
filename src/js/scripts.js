import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import starsTexture from '../img/stars.jpg';
import groundTexture from '../img/ground.png';
import mapTexture from '../img/map.png';
import seaTexture from '../img/sea.png';
import ship from '../models/ship.glb';
import crane_1 from '../models/crane_1.glb';
import crane_2 from '../models/crane_2.glb';

const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

let width = 0
let height = 0
let intersects = []
let hovered = {}


class Container extends THREE.Mesh {

  constructor(name) {
    super()
    this.name = name;
    this.color = this.get_color();
    this.geometry = new THREE.BoxGeometry(5, 2.5, 2.5)
    this.material = new THREE.MeshStandardMaterial({ color: this.color })
    this.cubeSize = 1
    this.cubeActive = false
  }

  get_color(){
    const colors = [0xab3e3e, 0x3a8bd6, 0xe8c125, 0x38bd2a];
    return colors[Math.floor(Math.random()*colors.length)]
  }

  render() {
    return
  }

  onPointerOver(e) {
    this.material.color.set('hotpink')
    this.material.color.convertSRGBToLinear()
  }

  onPointerOut(e) {
    this.material.color.set(this.color)
  }

  onClick(e) {
    this.cubeActive = !this.cubeActive
    this.scale.setScalar(this.cubeSize * (this.cubeActive ? 1.5 : 1))
  }
}

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

make_ground();
make_buildings();
make_the_ship();
make_containers(-7, 42);
make_containers(26, 42);
make_containers(-7, 0);
make_containers(26, 0);
make_the_crane(-40, 0);
make_the_crane(-40, 40);
make_the_crane_1();
make_lights();


function make_lights(){

    const ambientLight = new THREE.AmbientLight(0x333333);
    ambientLight.position.y = 100;
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
    scene.add(pointLight);

    const pointLight_1 = new THREE.PointLight(0xFFFFFF, 2, 300);

    pointLight_1.position.x = -100;
    pointLight_1.position.y = 100;
    scene.add(pointLight_1);
}

function make_the_ship(){

    const loader = new GLTFLoader();

    loader.load(ship, function ( glb ) {

        const block = glb.scene;
        block.scale.set(8, 8, 8);
        block.position.x = -60;
        block.position.z = 25;
        block.position.y = 2;
        scene.add(block)
    
      }, undefined, function ( error ) {
        console.log(error);

    });
}

function make_the_crane(x, y){

    const loader = new GLTFLoader();

    loader.load(crane_1, function ( glb ) {

        console.log("alles gut")

        const block = glb.scene;
        block.scale.set(0.8, 0.8, 0.8);
        block.position.x = x;
        block.position.z = y;
        block.rotation.y = 1.5708;

        scene.add(block)
    
      }, undefined, function ( error ) {
        console.log(error)
    });
}

function make_the_crane_1(){

    const loader = new GLTFLoader();

    loader.load(crane_2, function ( glb ) {

        const block = glb.scene;
        block.position.x = 32;
        block.rotation.y = 1.5708;

        scene.add(block)
    
      }, undefined, function ( error ) {
        console.log(error)
    });
}

function make_ground(){

    /*const obj = new THREE.Object3D();

    const objGeo = new THREE.BoxGeometry(10, 2, 10);
    const groundMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(groundTexture)
    });
    const seaMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(seaTexture)
    });

    for (x=-7; x<5; x++){     

        for (z=-7; z<5; z++){ 
            let mat = groundMat;
            if (z < -5 || x < -5) {
                mat = seaMat
            }                
            const block = new THREE.Mesh(objGeo, mat);
            block.position.x = x*10;
            block.position.z = z*10;
            obj.add(block)
        }

    }
    scene.add(obj)
    */

    const map = new THREE.MeshBasicMaterial({
        map: textureLoader.load(mapTexture)
    });
    const ground_block = new THREE.Mesh(new THREE.BoxGeometry(150, 4, 150),
                         map);

    const sea_block = new THREE.Mesh(new THREE.BoxGeometry(200, 2, 200),
                         new THREE.MeshBasicMaterial({color: 0x00aeff}));

    ground_block.position.y = -2;
    ground_block.position.z = 25;
    ground_block.position.x = 25;
    sea_block.position.y = -4;

    scene.add(ground_block);
    scene.add(sea_block);
}

function make_buildings(){

    const obj = new THREE.Object3D();
    const grey = 0xB0B0B0;
    
    //==========================================

    const b_3 = new THREE.Mesh(new THREE.BoxGeometry(34, 10, 12),
                         new THREE.MeshStandardMaterial({color: grey}));
    b_3.position.x = 25;
    b_3.position.z = 87;
    b_3.position.y = 5;

    obj.add(b_3);
    
    //==========================================

    const b_4_1 = new THREE.Mesh(new THREE.BoxGeometry(12, 5, 35),
                         new THREE.MeshStandardMaterial({color: grey}));
    b_4_1.position.x = 88;
    b_4_1.position.z = 10;
    b_4_1.position.y = 2.5;

    const b_4_2 = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 8),
                         new THREE.MeshStandardMaterial({color: grey}));
    b_4_2.position.x = 90;
    b_4_2.position.z = 2;
    b_4_2.position.y = 4;

    const b_4_3 = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 8),
                         new THREE.MeshStandardMaterial({color: grey}));
    b_4_3.position.x = 90;
    b_4_3.position.z = 18;
    b_4_3.position.y = 4;

    obj.add(b_4_1);
    obj.add(b_4_2);
    obj.add(b_4_3);
    
    //==========================================

    const b_5_1 = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 10),
                         new THREE.MeshStandardMaterial({color: grey}));
    b_5_1.position.x = -35;
    b_5_1.position.z = -35;
    b_5_1.position.y = 2.5;

    const b_5_2 = new THREE.Mesh(new THREE.BoxGeometry(6, 5, 6),
                         new THREE.MeshStandardMaterial({color: grey}));
    b_5_2.position.x = -28;
    b_5_2.position.z = -37;
    b_5_2.position.y = 2.5;

    obj.add(b_5_1);
    obj.add(b_5_2);
    
    //==========================================
    
    const b_6_1 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 15, 32),
                         new THREE.MeshStandardMaterial({color: grey}));
    b_6_1.position.x = 85;
    b_6_1.position.z = 61;
    b_6_1.position.y = 7.5;

    const b_6_2 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 15, 32),
                         new THREE.MeshStandardMaterial({color: grey}));
    b_6_2.position.x = 85;
    b_6_2.position.z = 84;
    b_6_2.position.y = 7.5;

    obj.add(b_6_1);
    obj.add(b_6_2);
    
    //==========================================

    scene.add(obj);
}

function make_containers(main_z, main_x){

    const obj = new THREE.Object3D();

    for (level=0; level<4; level++){
        for (x=0; x<5; x++){

            for (y=0; y<6; y++){

                if (level==3 && x==4){
                    continue;
                }

                if (level==2 && (x==4 || x == 0) && y>2){
                    continue;
                }

                if (level==3 && y>2){
                    continue;
                }

                if (y==2){
                    continue;
                }

                const block = new Container(level+""+x+""+y);
            
                block.position.x = main_x-(2.5*y);
                block.position.z = main_z +(5*x);
                block.position.y = 1+(level*2.5);
                block.rotation.y = 1.5708;
                obj.add(block);
            }
        }
    }
    scene.add(obj)
}

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// events
window.addEventListener('pointermove', (e) => {

  mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1)
  raycaster.setFromCamera(mouse, camera)
  intersects = raycaster.intersectObjects(scene.children, true)

  Object.keys(hovered).forEach((key) => {
    const hit = intersects.find((hit) => hit.object.uuid === key)
    if (hit === undefined) {
      const hoveredItem = hovered[key]
      if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem)
      delete hovered[key]
    }
  })

  intersects.forEach((hit) => {
    if (!hovered[hit.object.uuid]) {
      hovered[hit.object.uuid] = hit
      if (hit.object.onPointerOver) hit.object.onPointerOver(hit)
    }
    // Call onPointerMove
    if (hit.object.onPointerMove) hit.object.onPointerMove(hit)
  })
})

window.addEventListener('click', (e) => {
  intersects.forEach((hit) => {
    if (hit.object.onClick) hit.object.onClick(hit)
  })
})


function resize() {
  width = window.innerWidth
  height = window.innerHeight
  camera.aspect = width / height
  const target = new THREE.Vector3(0, 0, 0)
  const distance = camera.position.distanceTo(target)
  const fov = (camera.fov * Math.PI) / 180
  const viewportHeight = 2 * Math.tan(fov / 2) * distance
  const viewportWidth = viewportHeight * (width / height)
}

window.addEventListener('resize', resize)
resize()
