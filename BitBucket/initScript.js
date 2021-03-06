/// <reference path="babylon.js" />
/// <reference path="cannon.js" />
function createScene(engine) {


    //create scene
    var scene = new BABYLON.Scene(engine);

    //Physics Enable
    var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);


    //Create a Camera
    var camera1 = new BABYLON.ArcRotateCamera("Camera", 0, 1, 40, new BABYLON.Vector3(0, 2, 0), scene);
    camera1.lowerBetaLimit = 0.6;
    camera1.upperBetaLimit = 1.5;


    //Create Light
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    //Ground
    /*
     * Name
     * Src
     * Width
     * Height
     * Number of subdevisions
     * Min Height
     * Max Height
     * Scene
     * Updatable if Dynamic
     * SuccessCallback, when finished called
     * */
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/terrain_02.png", 200, 200, 100, 0, 2, scene, false, function () {
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, {
            mass: 0,
            restitution: 0.9,
            friction: 1
        })
    });
    ground.position.y = 0;

    var bumpMaterial = new BABYLON.StandardMaterial("texture1", scene);
    bumpMaterial.diffuseTexture = new BABYLON.Texture("textures/grass.jpg", scene);
    bumpMaterial.diffuseTexture.uScale = 10.0;
    bumpMaterial.diffuseTexture.vScale = 10.0;
    bumpMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = bumpMaterial;
    ground.receiveShadows = true;


    //Todo Importi vsako gumo posebej in na tak način naredi fiziko
    //Physics BOX
    var box = BABYLON.Mesh.CreateBox("box", 7, scene);
    box.scaling = new BABYLON.Vector3(1.5, 1, 1);
    box.position = new BABYLON.Vector3(-0.5, 6.5, 0);
    box.bakeCurrentTransformIntoVertices(); //Scaling fixed parent-child
    box.visibility = 0.1;
    box.setPhysicsState({impostor: BABYLON.PhysicsEngine.BoxImpostor, restitution: 0.2, mass: 1, friction: 1});
    box.showBoundingBox = true;
    box.updatePhysicsBodyPosition();
    // box.moveWithCollisions(new BABYLON.Vector3(5, 0, 0));
    box.refreshBoundingInfo();

    //Tractor
    var tractor;
    BABYLON.SceneLoader.ImportMesh("", "blender/", "tractor_scene.babylon", scene, function (newMeshes) {
        tractor = new Tractor(newMeshes[0]);
        tractor.setY(2.8);
        tractor.mesh.parent = box;
    });
    //Todo Importi vsako gumo posebej in na tak način naredi fiziko


    /*
     //wheel radius
     var rad = 2;
     //height
     var h = 2;
     //width
     var w = 4;
     //depth
     var d = 5;

     var body = BABYLON.MeshBuilder.CreateBox("box", {
     width: (w),
     height: h,
     depth: (d)
     }, scene);
     body.position.y = h + 2;

     //Kolesa
     var wheel1 = BABYLON.MeshBuilder.CreateSphere("wheel1", {
     diameterY: rad,
     diameterX: rad / 2,
     diameterZ: rad,
     segments: 5
     }, scene);
     wheel1.position.copyFromFloats(-(w), 2, -d);

     var wheel2 = BABYLON.MeshBuilder.CreateSphere("wheel2", {
     diameterY: rad,
     diameterX: rad / 2,
     diameterZ: rad,
     segments: 5
     }, scene);
     wheel2.position.copyFromFloats((w), 2, -d);

     var wheel3 = BABYLON.MeshBuilder.CreateSphere("wheel3", {
     diameterY: rad,
     diameterX: rad / 2,
     diameterZ: rad,
     segments: 5
     }, scene);
     wheel3.position.copyFromFloats(-(w), 2, d);

     var wheel4 = BABYLON.MeshBuilder.CreateSphere("wheel4", {
     diameterY: rad,
     diameterX: rad / 2,
     diameterZ: rad,
     segments: 5
     }, scene);
     wheel4.position.copyFromFloats((w), 2, d);

     */
    return scene;
};


var Tractor = function (mesh) {
    this.mesh = mesh;

    this.setX = function (x) {
        this.mesh.position.x = x;
    }
    this.setY = function (y) {
        this.mesh.position.y = y;
    }
    this.setZ = function (z) {
        this.mesh.position.z = z;
    }
    this.setupPhysiscs = function (mesh) {
        console.log(mesh);
    }

}


onLoad = function () {

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        //Get the Canvas
        var canvas = document.getElementById('canvas');

        //Create a BabylonJS engine object
        var engine = new BABYLON.Engine(canvas, true);

        //Create a scene
        var scene = createScene(engine);
        scene.activeCamera.attachControl(canvas);


        /*  BABYLON.SceneLoader.Load("", "blender/tractor_scene.babylon", engine, function (newScene) {
         var ImportedScene = newScene;

         //Create a Camera
         var camera1 = new BABYLON.ArcRotateCamera("Camera", 1.58, 1, 40, new BABYLON.Vector3(0, 2, 0), ImportedScene);
         //Create Light
         var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), ImportedScene);
         light.intensity = 0.7;


         ImportedScene.executeWhenReady(function () {
         ImportedScene.activeCamera.attachControl(canvas);
         engine.runRenderLoop(function () {
         ImportedScene.render();
         })
         })
         });
         */
        // Babylon
        engine.runRenderLoop(function () {
            scene.render()
        });


        window.addEventListener("resize", function () {
            engine.resize()
        })

    }
}
;

function keyUp(event) {
    var k = event.keyCode;
}

function keyDown(event) {
    var k = event.keyCode;
}
