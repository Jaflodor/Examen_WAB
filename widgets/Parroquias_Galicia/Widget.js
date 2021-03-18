define(['dojo/_base/declare', 'jimu/BaseWidget', "dojo/_base/lang", "esri/tasks/query", "esri/tasks/QueryTask", "esri/SpatialReference", "esri/graphic", "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/symbols/SimpleLineSymbol"], function (declare, BaseWidget, lang, query, QueryTask, SpatialReference, graphic, SimpleFillSymbol, Color, SimpleLineSymbol) {
      //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget], {

            // Custom widget code goes here

            baseClass: 'parroquias-galicia',
            // this property is set by the framework when widget is loaded.
            // name: 'Parroquias_Galicia',
            // add additional properties here

            //methods to communication with app container:
            postCreate: function postCreate() {
                  this.inherited(arguments);
                  console.log('Parroquias_Galicia::postCreate');
            },

            startup: function startup() {
                  this.inherited(arguments);
                  console.log('Parroquias_Galicia::startup');
            },

            onOpen: function onOpen() {
                  console.log('Parroquias_Galicia::onOpen');
            },

            lista_concejos: function lista_concejos() {

                  var cod_provincia = this.buscador_provincias.value;

                  console.log(cod_provincia);

                  if (cod_provincia == -1) return;

                  this.buscador_concejos.innerHTML = "";

                  var consultaTask = new QueryTask(this.config.Concejos);

                  var consulta = new query();

                  consulta.returnGeometry = false;
                  consulta.outFields = ["CODCONC", "CONCELLO"];
                  consulta.orderByFields = ["CONCELLO"];
                  consulta.where = "CODPROV = " + cod_provincia;

                  consultaTask.execute(consulta, lang.hitch(this, function (evt) {

                        var opciones = document.createElement("option");
                        opciones.value = -1;
                        opciones.text = "Seleccione un Concejo";
                        this.buscador_concejos.add(opciones);

                        for (var i = 0; i < evt.features.length; i++) {

                              opciones = document.createElement("option");
                              opciones.value = evt.features[i].attributes.CODCONC;
                              opciones.text = evt.features[i].attributes.CONCELLO;
                              this.buscador_concejos.add(opciones);

                              console.log(opciones);
                        }
                  }));
            },
            lista_parroquias: function lista_parroquias() {

                  console.log(this.buscador_concejos);

                  var cod_concejo = this.buscador_concejos.value;

                  console.log(cod_concejo);

                  if (cod_concejo == -1) return;

                  // this.buscador_concejos.innerHTML="";

                  var consultaTaskk = new QueryTask(this.config.Parroquias);

                  var consultaa = new query();

                  consultaa.returnGeometry = false;
                  consultaa.outFields = ["CODCONC", "PARROQUIA"];
                  consultaa.orderByFields = ["PARROQUIA"];
                  consultaa.where = "CODCONC = " + cod_concejo;

                  consultaTaskk.execute(consultaa, lang.hitch(this, function (evt) {

                        var opciones = document.createElement("option");
                        opciones.value = -1;
                        opciones.text = "Seleccione una Parroquia";
                        this.buscador_parroquias.add(opciones);

                        for (var i = 0; i < evt.features.length; i++) {

                              opciones = document.createElement("option");
                              opciones.value = evt.features[i].attributes.CODCONC;
                              opciones.text = evt.features[i].attributes.PARROQUIA;
                              this.buscador_parroquias.add(opciones);
                        }
                  }));
            },
            zoomConcejos: function zoomConcejos() {

                  var cod_concejo = this.buscador_concejos.value;

                  if (cod_concejo == -1) return;

                  // this.buscador_concejos.innerHTML="";

                  var consultaTask = new QueryTask(this.config.Concejos);

                  var consulta = new query();

                  consulta.returnGeometry = true;
                  consulta.outFields = ["CODCONC", "CONCELLO"];
                  consulta.orderByFields = ["CONCELLO"];
                  consulta.where = "CODCONC = " + cod_concejo;
                  consulta.outSpatialReference = new SpatialReference(102100);

                  consultaTask.execute(consulta, lang.hitch(this, function (evt) {

                        console.log(evt);

                        if (evt.features.length > 0) {

                              var geometria = evt.features[0].geometry;
                              this.map.graphics.clear();
                              this.map.graphics.add(new graphic(geometria, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASHDOTDOT, new Color([234, 152, 223]), 2), new Color([235, 141, 106, 0.25]))));
                              this.map.setExtent(geometria.getExtent(), true);
                        }
                  }));
            },
            zoomParroquias: function zoomParroquias() {

                  var cod_parroquia = this.buscador_parroquias.value;

                  if (cod_parroquia == -1) return;

                  // this.buscador_concejos.innerHTML="";

                  var consultaTask = new QueryTask(this.config.Parroquias);

                  var consulta = new query();

                  consulta.returnGeometry = true;
                  consulta.outFields = ["CODCONC", "PARROQUIA"];
                  consulta.orderByFields = ["PARROQUIA"];
                  consulta.where = "CODCONC = " + cod_parroquia;
                  consulta.outSpatialReference = new SpatialReference(102100);

                  consultaTask.execute(consulta, lang.hitch(this, function (evt) {

                        console.log(evt);

                        if (evt.features.length > 0) {

                              var geometria = evt.features[0].geometry;
                              this.map.graphics.clear();
                              this.map.graphics.add(new graphic(geometria, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SHORTDASHDOTDOT, new Color([101, 133, 233]), 2), new Color([101, 226, 223, 0.25]))));
                              this.map.setExtent(geometria.getExtent(), true);
                        }
                  }));
            },


            onClose: function onClose() {
                  console.log('Parroquias_Galicia::onClose');
            },

            onMinimize: function onMinimize() {
                  console.log('Parroquias_Galicia::onMinimize');
            }

            // onMaximize: function(){
            //   console.log('Parroquias_Galicia::onMaximize');
            // },

            // onSignIn: function(credential){
            //   console.log('Parroquias_Galicia::onSignIn', credential);
            // },

            // onSignOut: function(){
            //   console.log('Parroquias_Galicia::onSignOut');
            // }

            // onPositionChange: function(){
            //   console.log('Parroquias_Galicia::onPositionChange');
            // },

            // resize: function(){
            //   console.log('Parroquias_Galicia::resize');
            // }

            //methods to communication between widgets:

      });
});
//# sourceMappingURL=Widget.js.map
