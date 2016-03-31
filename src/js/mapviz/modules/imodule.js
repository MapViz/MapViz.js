var IModule = {
	isMapVizModule: true,
  data: function(data){
    this.data = data;

    if(this.data && typeof this.data.then === "function"){
      this.data.then(null, function(err){
        console.warn('error data', arguments);
      }.bind(this));
    };

    return this;
  },
  addTo: function (mapviz) {
    if (typeof this.show !== "function") {
      throw new Error("MapViz modules must have method show for displaying the data.");
    };

    // this.id = id;
    this.map = mapviz.map;
    this.mapviz = mapviz;
    this.show();
    return this;
  },
  remove: function(){
    throw new Error('Module has not implemented remove method - can\'t remove it');
  }
};
module.exports = IModule;
