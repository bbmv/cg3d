/**
 * Three-Dimensional Computer Graphics Library
 * cg3d.js (c) 2017 Boris Buimov
 * 
 * @version 1.1.0
 * @author Boris Buimov
 * @fileoverview This file contains three classes 
 * to work with elements of computer graphics - objects, transformations matrices and a scene.
 */
/**
 * @namespace
 * @name cg3d
 * @return {object} An interface 
 */
var cg3d = (function() {

  var Matrix = lalgebra.Matrix;
  var errMsg = lalgebra.errMsg;
  var check2dArray = lalgebra.check2dArray;

  /**
   * Creates an object.
   * 
   * @memberof cg3d
   * @constructor
   * @this {Object3d}
   * @param {Array} vertices An array of elements for the Matrix.
   * @param {Array} edges An array of edges of the object.
   * @param {object} settings An object with properties of segments, points and captions.
   */
  function Object3d(vertices, edges, settings) {
    var cols = 0;
    var obj = new Matrix(vertices);

    if(obj.getCols()!==4) {
      throw errMsg("Matrix of the three-dimensional object should have four columns!", "cg-ob-001");
    }
    if(check2dArray(edges)) cols = edges[0].length;

    if(cols!==2) {
      throw errMsg("Matrix of edges should have two columns!", "cg-ob-002");
    }
    if(!(settings["segments"] && settings["points"] && settings["captions"])) {
      throw errMsg("Settings should have three properties: segments, points and captions!", "cg-ob-003");
    }
    /**
     * Copies the object.
     *
     * @memberof cg3d.Object3d
     * @return {Object3d} A copy of the object
     */
    this.getCopy = function() { 
      var els = obj.getElems();
      return new Object3d(els, edges, settings);
      //JSON.parse(JSON.stringify(edges)), JSON.parse(JSON.stringify(settings))
    };
    /**
     * Gets elements of the object matrix.
     *
     * @memberof cg3d.Object3d
     * @return {Array} An array of the object matrix
     */
    this.getElems = function() { 
      return obj.getElems();
    };
    /**
     * Applies a transformation to the object.
     *
     * @memberof cg3d.Object3d
     * @param {Transform3d} tMx Contains a matrix of the transformation.
     */
    this.applyTransformation = function(tMx) { 
      if(tMx instanceof Transform3d) { 
        obj = obj.multiply(tMx.getMatrix()).normolize();
      }
    };
    /**
     * Displays the array elements into columns like in matrixes.
     * @memberof cg3d.Object3d
     */
    this.trace = function() { obj.trace(); };
    /**
     * Returns coordinates of the object edges and their visual settings.
     *
     * @memberof cg3d.Object3d
     * @return {object} An object contains coordinates of the edges, their width and color.
     */
    this.getSegments = function() {
      var coords = [];
      var tmpArr = obj.getElems();

      var amountEdges = edges.length;
      var p1, p2;

      for(var i=0; i<amountEdges; i+=1) {
        p1 = tmpArr[edges[i][0]].slice(0, -1);
        p2 = tmpArr[edges[i][1]].slice(0, -1);
        coords.push({
          "p1":{"x":p1[0], "y":p1[1], "z":p1[2]},  
          "p2":{"x":p2[0], "y":p2[1], "z":p2[2]}
        });
      }
      return {
        "coords": coords,
        "width": settings.segments.width,
        "color": settings.segments.color
      };
    };
    /**
     * Returns coordinates of the object verteces and their visual settings.
     *
     * @memberof cg3d.Object3d
     * @return {object} An object contains coordinates of the verteces, their width and color.
     */
    this.getPoints = function() {
      var coords = [];
      var tmpArr = obj.getElems();
      var rows = obj.getRows();
      var cols = obj.getCols();
      var p;

      for(var i=0; i<rows; i+=1) {
        p = tmpArr[i].slice(0, -1);
        coords.push({"x":p[0], "y":p[1], "z":p[2]});
      }
      return {
        "coords": coords,
        "width": settings.points.width,
        "color": settings.points.color
      };
    };
    /**
     * Returns captions of the verteces and their visual settings.
     *
     * @memberof cg3d.Object3d
     * @return {object} An object contains coordinates of the verteces, their texts, font and color.
     */
    this.getCaptions = function() {
      var coords = this.getPoints().coords;

      return {
        "coords": coords,
        "texts": settings.captions.texts || [],
        "font": settings.captions.font,
        "color": settings.captions.color
      };
    };
  }  
  //==================================================================================
  /**
   * Creates a matrix of combined transformations.
   * 
   * @memberof cg3d
   * @constructor
   * @this {Transform3d}
   * @param {Array} els An array of elements for the transformation Matrix
   */
  function Transform3d(els) {
    var elements = els ||  [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
    var tMx = new Matrix(elements);
    /**
     * Displays the array elements into columns like in matrixes.
     * @memberof cg3d.Transform3d
     */
    this.trace = function() { tMx.trace(); };
    /**
     * Returns a copy of the transformation Matrix.
     *
     * @memberof cg3d.Transform3d
     * @return {Matrix} A copy of the transformation Matrix
     */
    this.getMatrix = function() { return tMx.getCopy(); };
    /**
     * Gets elements of the transformation Matrix.
     *
     * @memberof cg3d.Transform3d
     * @return {Array} An array of the transformation Matrix
     */
    this.getElems = function() { return tMx.getElems(); };
    /**
     * Multiplies the matrix of combined transformations by translation matrix.
     *
     * @memberof cg3d.Transform3d
     * @param {string} axis A name of axis.
     * @param {number} v A value of the transformation.
     */
    this.move = function(axis, v) {
      var tmpArr; 
      
      v = parseFloat(v);
      if(isNaN(v)) axis = "n"; // function will return a unity martix

      switch(axis.toLowerCase())
      {
        case "z": tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,v,1 ]];
        break;
        case "x": tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ v,0,0,1 ]];
        break;
        case "y": tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,v,0,1 ]];
        break;
        default:  tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
      }
      var transform = new Matrix(tmpArr);
      tMx = tMx.multiply(transform);
    };    
    /**
     * Multiplies the matrix of combined transformations by rotation matrix.
     *
     * @memberof cg3d.Transform3d
     * @param {string} axis A name of axis.
     * @param {number} angle An angle of rotation.
     */
    this.rotate = function(axis, angle) {
      var tmpArr; 
      var a;

      angle = parseFloat(angle);
      if(isNaN(angle)) axis = "n"; // function will return a unity martix
      else a = angle/180*Math.PI;

      switch(axis.toLowerCase())
      {
        case "z": tmpArr = [[ Math.cos(a), Math.sin(a), 0,  0],
                            [-Math.sin(a), Math.cos(a), 0,  0],
                            [ 0,           0,           1,  0],
                            [ 0,           0,           0,  1]];
          break;
        case "x": tmpArr = [[1,      0,           0,          0],
                            [0,      Math.cos(a), Math.sin(a),0],
                            [0,     -Math.sin(a), Math.cos(a),0],
                            [0,      0,           0,          1]];
          break;
        case "y": tmpArr = [[Math.cos(a), 0,     -Math.sin(a),0],
                            [0,           1,      0,          0],
                            [Math.sin(a), 0,      Math.cos(a),0],
                            [0,           0,      0,          1]];
          break;
        default: tmpArr =  [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
        }
      var transform = new Matrix(tmpArr);
      tMx = tMx.multiply(transform);
    };
    /**
     * Multiplies the matrix of combined transformations by arbitary rotation matrix.
     *
     * @memberof cg3d.Transform3d
     * @param {object} vector The arbitary axis.
     * @param {number} angle An angle of rotation.
     */
    this.rotateFree = function(vector, angle) {
      var crt = {};

      if(!lalgebra.checkSegment(vector)) {
        crt = { x:0, y:0, z:1 };
      }
      else {
        crt.x = vector.p2.x - vector.p1.x;
        crt.y = vector.p2.y - vector.p1.y;
        crt.z = vector.p2.z - vector.p1.z;
      }
      angle = parseFloat(angle);
      if(isNaN(angle)) angle = 0;

      var sph = lalgebra.cartesianToSpherical(crt);
      this.move("x", -vector.p1.x);
      this.move("y", -vector.p1.y);
      this.move("z", -vector.p1.z);
      this.rotate("z", -sph.a);
      this.rotate("y", -sph.b);
      this.rotate("z", angle);
      this.rotate("y", sph.b);
      this.rotate("z", sph.a);
      this.move("x", vector.p1.x);
      this.move("y", vector.p1.y);
      this.move("z", vector.p1.z);
    }
    /**
     * Multiplies the matrix of combined transformations by scaling matrix.
     *
     * @memberof cg3d.Transform3d
     * @param {string} axis A name of axis.
     * @param {number} v A value of the transformation.
     */
    this.scale = function(axis, v) {
      var tmpArr; 

      v = parseFloat(v);
      if(isNaN(v)) axis = "n"; // function will return a unity martix

      switch(axis.toLowerCase())
      {
        case "z": tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,v,0 ],
                            [ 0,0,0,1 ]];
        break;
        case "x": tmpArr = [[ v,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
        break;
        case "y": tmpArr = [[ 1,0,0,0 ],
                            [ 0,v,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
        break;
        case "s": tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,v ]];
        break;
        default:  tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
     }
      var transform = new Matrix(tmpArr);
      tMx = tMx.multiply(transform);
    };
    /**
     * Multiplies the matrix of combined transformations by perspective matrix.
     *
     * @memberof cg3d.Transform3d
     * @param {string} axis A name of axis.
     * @param {number} v A value of the transformation.
     */
    this.perspective = function(axis, v) {
      var tmpArr; 

      v = parseFloat(v);
      if(isNaN(v)) axis = "n"; // function will return a unity martix

      switch(axis.toLowerCase())
      {
        case "z": tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,v ],
                            [ 0,0,0,1 ]];
        break;
        case "x": tmpArr = [[ 1,0,0,v ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
        break;
        case "y": tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,v ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
        break;
        default:  tmpArr = [[ 1,0,0,0 ],
                            [ 0,1,0,0 ],
                            [ 0,0,1,0 ],
                            [ 0,0,0,1 ]];
      }
      var transform = new Matrix(tmpArr);
      tMx = tMx.multiply(transform);
    };
  }
  //==================================================================================
  /**
   * Creates a scene with three-dimensional objects.
   * 
   * @memberof cg3d
   * @constructor
   * @this {Scene3d}
   * @param {CanvasRenderingContext2D} ctx Two-dimensional context.
   * @param {object} center A center of the canvas.
   * @param {number} scale A koefficient of scaling.
   */
  function Scene3d(ctx, center, scale) {
    var objects = [];
    var view = new Transform3d;
    var space = new Transform3d;

    if(!(ctx instanceof CanvasRenderingContext2D))
      throw errMsg("Problem with a canvas context!", "cg-sc-001");

    center = center || {"x":0, "y":0};

    setSpace();
    /**
     * Creates a transformation matrix to convert object coordinates into the screen coordinates.
     */
    function setSpace() {
      space = new Transform3d;

      space.scale("y", -1);
      space.scale("s", 1/scale);
      space.move("x", center.x);
      space.move("y", center.y);
    }
    /**
     * Removes one or more objects from the object array of the scene.
     * 
     * @memberof cg3d.Scene3d
     * @param {number} idx An index of the object.
     */
    this.clearObjects = function(idx) {
      idx = parseInt(idx);
      if(isNaN(idx)) objects.splice(0);
      else objects.splice(idx, 1);
    }
    /**
     * Adds an object to the object array of the scene.
     * 
     * @memberof cg3d.Scene3d
     * @param {Object3d} obj An three-dimensional object.
     */
    this.addObject = function(obj) {
      objects.push(obj);
    }
    /**
     * Displays the objects of the scene.
     * 
     * @memberof cg3d.Scene3d
     */
    this.draw = function() {
      var obj, o;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for(var i=0, count=objects.length; i<count; i+=1) {
        obj = objects[i].getCopy();
        obj.applyTransformation(view);
        obj.applyTransformation(space);

        drawSegments(obj.getSegments());
        drawPoints(obj.getPoints());
        drawCaptions(obj.getCaptions());
      }
    }
    /**
     * Creates a transformation matrix to set a viewport up.
     * 
     * @memberof cg3d.Scene3d
     * @param {object} vector A viewing vector.
     * @param {boolean} isPerspective It's true if we needs a perspective view.
     */
    this.setView = function(vector, isPerspective) {
      if(!lalgebra.checkSegment(vector)) return;

      var p1 = vector.p1, p2 = vector.p2;
      var crt = {};

      crt.x = p2.x - p1.x;
      crt.y = p2.y - p1.y;
      crt.z = p2.z - p1.z;

      var mod = lalgebra.vectorMagnitude(crt);
      if(mod===0) return;
      
      view = new Transform3d;

      var sph = lalgebra.getAngles(crt);
      view.move("x", -p1.x);
      view.move("y", -p1.y);
      view.move("z", -p1.z);
      view.rotate("y", -sph.a);
      view.rotate("x", -sph.b+90);
      if(isPerspective) view.perspective("z", -1/mod);
    }
    /**
     * Displays the object edges.
     *
     * @memberof cg3d.Scene3d
     */
    function drawSegments(segments) {
      var p1, p2;
      var coords = segments.coords;

      ctx.beginPath();
      for(var i=0, count=coords.length; i<count; i+=1) {
        p1 = coords[i].p1;
        p2 = coords[i].p2;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.strokeStyle = segments.color;
      ctx.lineWidth = segments.width;
      ctx.stroke();
    }
    /**
     * Displays the object verteces.
     *
     * @memberof cg3d.Scene3d
     */
    function drawPoints(points) {
      var p;
      var coords = points.coords;
      var radius = points.width/2;

      ctx.fillStyle = points.color;
      for(var i=0, count=coords.length; i<count; i+=1) {
        p = coords[i];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, radius, 0, Math.PI*2, true);
        ctx.fill();
      }
    }
    /**
     * Displays the captions of the verteces.
     *
     * @memberof cg3d.Scene3d
     */
    function drawCaptions(captions) {
      var p;
      var coords = captions.coords;
      var texts = captions.texts;
      ctx.font = captions.font;
      ctx.fillStyle = captions.color;
      ctx.textBaseline = "top";

      var count = (texts.length < coords.length)? texts.length : coords.length;
      for(var i=0; i<count; i+=1) {
        p = coords[i];
        ctx.beginPath();
        ctx.fillText(texts[i], p.x+2, p.y+2);
        ctx.fill();
      }
    }
  }
  //==================================================================================
  return { // An API of cg3d
    "Object3d": Object3d,
    "Transform3d": Transform3d,
    "Scene3d": Scene3d
  }
}());
