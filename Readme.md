## 3-D Computer Graphics Library
cg3d.js (c) 2017 Boris Buimov

version 1.1.4

This library contains three classes to work with three-dimensional elements of computer graphics - objects, transformations matrices and a scene (With a JSDoc documentation).

#### API

``` cg3d.Object3d(vertices, edges, settings) ```
\- *Creates an object.*

``` cg3d.Object3d.applyTransformation(tMx) ```
\- *Applies a transformation to the object.*

``` cg3d.Object3d.getCaptions() ```
\- *Returns captions of the verteces and their visual settings.*

``` cg3d.Object3d.getCopy() ```
\- *Copies the object.*

``` cg3d.Object3d.getElems() ```
\- *Gets elements of the object matrix.*

``` cg3d.Object3d.getPoints() ```
\- *Returns coordinates of the object verteces and their visual settings.*

``` cg3d.Object3d.getSegments() ```
\- *Returns coordinates of the object edges and their visual settings.*

``` cg3d.Object3d.trace() ```
\- *Displays the array elements into columns like in matrixes.*

``` cg3d.Transform3d(els) ```
\- *Creates a matrix of combined transformations.*

``` cg3d.Transform3d.getElems() ```
\- *Gets elements of the transformation Matrix.*

``` cg3d.Transform3d.getMatrix() ```
\- *Returns a copy of the transformation Matrix.*

``` cg3d.Transform3d.move(axis, v) ```
\- *Multiplies the matrix of combined transformations by translation matrix.*

``` cg3d.Transform3d.perspective(axis, v) ```
\- *Multiplies the matrix of combined transformations by perspective matrix.*

``` cg3d.Transform3d.rotate(axis, angle) ```
\- *Multiplies the matrix of combined transformations by rotation matrix.*

``` cg3d.Transform3d.rotateFree(vector, angle) ```
\- *Multiplies the matrix of combined transformations by arbitary rotation matrix.*

``` cg3d.Transform3d.scale(axis, v) ```
\- *Multiplies the matrix of combined transformations by scaling matrix.*

``` cg3d.Transform3d.trace() ```
\- *Displays the array elements into columns like in matrixes.*

``` cg3d.Scene3d(ctx, center, scale) ```
\- *Creates a scene with three-dimensional objects.*

``` cg3d.Scene3d.addObject(obj) ```
\- *Adds an object to the object array of the scene.*

``` cg3d.Scene3d.clearObjects(idx) ```
\- *Removes one or more objects from the object array of the scene.*

``` cg3d.Scene3d.draw() ```
\- *Displays the objects of the scene.*

``` cg3d.Scene3d.drawCaptions(captions) ```
\- *Displays the captions of the verteces.*

``` cg3d.Scene3d.drawPoints(points) ```
\- *Displays the object verteces.*

``` cg3d.Scene3d.drawSegments(segments) ```
\- *Displays the object edges.*

``` setSpace() ```
\- *Creates a transformation matrix to convert object coordinates into the screen coordinates.*

``` cg3d.Scene3d.setView(vector, isPerspective) ```
\- *Creates a transformation matrix to set a viewport up.*

