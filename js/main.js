dojo.require("esri.map");
dojo.require("esri.layers.ArcGISTiledMapServiceLayer");
dojo.require("esri.layers.ArcGISDynamicMapServiceLayer");
dojo.require("src/Echarts3Layer");

dojo.ready(function () {

    var map = new esri.Map('map', 'ArcGISTiledMapServiceLayer', {

        center: [124354.03889350894, 22297.06504766915],
        zoom: 11,
        navigationMode: "css-transform",
        force3DTransforms: true,
        logo: false,
        fitExtent: true,
        fadeOnZoom: true,
        slider: false
    });

    var tiled = new esri.layers.ArcGISTiledMapServiceLayer("http://web.zjj.sz.gov.cn/gis/szgeo/szmap_gov");
    map.addLayer(tiled);

    // var demographicsLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer("http://desktop-v1i9rte:6080/arcgis/rest/services/MyMapService88/MapServer");
    // map.addLayer(demographicsLayer1);


    dojo.connect(map, 'onClick', function (themap) {
        // console.log(themap.mapPoint);
        //  console.log("themap",map.getLevel())
    });


    dojo.connect(map, 'onZoom', function (themap) {
         console.log("themap",map.getLevel())

    })
    dojo.connect(map, 'onLoad', function (themap) {



        var heatmap = Dcq.Heatmap.Instance();
        if (!heatmap.isInited()) {
            heatmap.init({
                'map': map,
                'echarts': echarts
            });
        }
        window.heatmap = heatmap
        window.echarts = echarts

        //开始获取数据
        $.get("data.json", function (data) {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    var item = data[i][j];
                    result.push( [item.coord[0], item.coord[1]].concat(Math.ceil(Math.random()*100))  );
                }
            }
            console.log("result",result)
           // heatmap.drawpoints(result);
            heatmap.drawChart(result);
        }, "json")
    });
});
