// annotation canvas
// Keeps track of all information related to the main drawing canvas.
function canvas(div_attach) {
    
  // *******************************************
  // Private variables:
  // *******************************************
  
  this.annotations = null; // includes name, deleted, verified info
  this.div_attach = div_attach; // name of DIV element to attach to
    
  // *******************************************
  // Public methods:
  // *******************************************
  
  // Returns all of the annotations as an array.
  this.GetAnnotations = function () {
    return this.annotations;
  };

  // Loop through all of the annotations and clear them from the canvas.
  this.ClearAllAnnotations = function () {
    for(var i=0;i<this.annotations.length;i++) {
      this.annotations[i].DeletePolygon();
    }
  };
  
  // Add a new annotation to the canvas.
  this.AddAnnotation = function (anno) {
    if(!this.annotations) this.annotations = Array();
    this.annotations.push(anno);
  };
  
  // Attach the annotation to the canvas.
  this.AttachAnnotation = function (anno) {
    if(anno.GetDeleted()&&(!view_Deleted)) return;
    anno.SetDivAttach(this.div_attach);
    anno.DrawPolygon(main_image.GetImRatio());
    
    // *****************************************
    var anno_id = anno.GetAnnoID();
    anno.SetAttribute('onmousedown','main_handler.RestToSelected(' + anno_id + ',evt); return false;');
    anno.SetAttribute('onmousemove','main_handler.CanvasMouseMove(evt,' + anno_id + ');');
    anno.SetAttribute('oncontextmenu','return false');
    anno.SetAttribute('style','cursor:pointer;');
    // *****************************************
  };
  
  // Detach annotation from the canvas.
  this.DetachAnnotation = function(anno_id) {
    var anno = null;
    for(var i=0; i<this.annotations.length; i++) {
      if(this.annotations[i].GetAnnoID()==anno_id) {
	anno = this.annotations[i];
	anno.DeletePolygon();
      }
    }
    return anno;
  };

  // Render all attached annotations:
  this.RenderAnnotations = function () {
    if(!this.annotations) return;

    for(var pp=0; pp < this.annotations.length; pp++) {
      var anno_id = this.annotations[pp].GetAnnoID();
      this.annotations[pp].DrawPolygon(main_image.GetImRatio());
      this.annotations[pp].SetAttribute('onmousedown','main_handler.RestToSelected(' + anno_id + ',evt); return false;');
      this.annotations[pp].SetAttribute('onmousemove','main_handler.CanvasMouseMove(evt,'+ anno_id +'); return false;');
      this.annotations[pp].SetAttribute('oncontextmenu','return false');
      this.annotations[pp].SetAttribute('style','cursor:pointer;');
    }
  };
  
}
