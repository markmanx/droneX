import * as THREE from "three";
import OBJLoader from "three-obj-loader";
import OrbitControls from "three-orbitcontrols";
// import path from "path";

OBJLoader(THREE);

// const SRC_URLS = {
//   dev: {
//     model: path.join(__dirname, "/teapot.obj"),
//     texture: ""
//   },
//   live: {
//     model:
//       "https://public-4029.s3.eu-west-2.amazonaws.com/la-marne/source/MARNE.obj",
//     texture:
//       "https://public-4029.s3.eu-west-2.amazonaws.com/la-marne/textures/MARNE.jpg"
//   }
// };

export class GraphicSimulator {
    
  constructor(canvasRef) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(10, 10, 10);

    const { width, height } = canvasRef.current.getBoundingClientRect();

    this.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current});
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xffffff, 1.0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;

    const ground = this.createGround();
    this.scene.add( ground );

    this.onTick();
  }

  createGround() {
    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    const material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(0, 0, 0)

    return cube;
  }

//   async load() {
//     const { model, texture } = SRC_URLS.live;
//     const mesh = await this.loadModel(model);

//     const boundingBox = new THREE.Box3().setFromObject(mesh);
//     const { y } = boundingBox.getCenter();
//     mesh.translateY(-y);

//     let material;
//     if (texture) {
//       material = await this.loadTexture(texture);
//     } else {
//       material = new THREE.MeshBasicMaterial({ color: 0x2194ce });
//     }
//     material.side = THREE.DoubleSide;

//     mesh.traverse(function(child) {
//       if (child instanceof THREE.Mesh) {
//         child.material = material;
//       }
//     });

//     this.scene.add(mesh);
//   }

//   loadTexture(url) {
//     const loader = new THREE.TextureLoader();

//     return new Promise((resolve, reject) => {
//       loader.load(
//         url,
//         function(texture) {
//           const material = new THREE.MeshBasicMaterial({
//             map: texture
//           });
//           resolve(material);
//         },
//         undefined,
//         function(err) {
//           reject(new Error("An error occurred while loading texture."));
//         }
//       );
//     });
//   }

//   async loadModel(url) {
//     const loader = new THREE.OBJLoader();

//     return new Promise((resolve, reject) => {
//       loader.load(
//         url,
//         function(object) {
//           resolve(object);
//         },
//         function(xhr) {
//           console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//         },
//         function(error) {
//           reject(new Error("An error occurred while loading model"));
//         }
//       );
//     });
//   }

  onTick() {
    requestAnimationFrame(this.onTick.bind(this));
    // this.camera.lookAt(0, 0, 0);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
