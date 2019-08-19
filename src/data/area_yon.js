(function(){

    let area = LAM.createArea("Yon", {
        path: "maps/areas/Yon",
        zoomLevel: 4,
        bounds: [[0,0], [-500, 500]]
    });

    /*
    시작의 땅           Land of Beginnings
    위대한 성           Great Castle
    검은모루 작업장     Black Anvil Workshop
    미완의 정원         Unfinished Garden
    무쇠망치 작업장     Cast Iron Hammer Workshop
    기약의 땅           Land of Promise
    기막힌 양조장       Amazing Brewery
    오만의 방주         Ark of Oman
    */

    area.registerMap("Land of Beginnings", {
        type: MapTypeEnum.Continent,
        bounds: [[-320, 99], [-400, 205]]
    });

    area.registerMap("Great Castle", {
        type: MapTypeEnum.City,
        bounds: [[-211, 108], [-300, 200]]
    });

    area.registerMap("Black Anvil Workshop", {
        type: MapTypeEnum.Continent,
        bounds: [[-210, 208], [-306, 303]]
    });

    area.registerMap("Unfinished Garden", {
        type: MapTypeEnum.Continent,
        bounds: [[-199, 0], [-310, 100]]
    });

    area.registerMap("Cast Iron Hammer Workshop", {
        type: MapTypeEnum.Continent,
        bounds: [[-210, 314], [-305, 408]]
    });

    area.registerMap("Land of Promise", {
        type: MapTypeEnum.Continent,
        bounds: [[-97, 417], [-204, 520]]
    });

    area.registerMap("Amazing Brewery", {
        type: MapTypeEnum.Dungeon,
        bounds: [[-101, 206], [-204, 310]]
    });

    area.registerMap("Ark of Oman", {
        type: MapTypeEnum.Dungeon,
        bounds: [[-7, 308], [-103, 403]]
    });

})();