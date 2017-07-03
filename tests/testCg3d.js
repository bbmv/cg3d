describe("Object3d", function() {
  var Object3d = cg3d.Object3d;
  var array = 
    [[1, 0, 0],
     [0, 0, 0],
     [1, 1, 1],
     [0, 0, 1]];
  //------------------------------------------
  describe("constructor( )", function() {
    it("Sets up matrix elements of the object", function() {
      var obj = new Object3d(vertecies, edges, settings);
      var mx = new Matrix(array);
      var rows = array.length;
      var cols = array[0].length;
      assert.deepEqual(mx.getElems(), array);
      assert.equal(mx.getRows(), rows);
      assert.equal(mx.getCols(), cols);
    });
  });
});


