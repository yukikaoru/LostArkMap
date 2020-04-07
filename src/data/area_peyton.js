(function(){

    let area = LAM.createArea("Peyton", {
        path: "maps/areas/Peyton",
        zoomLevel: 4,
        bounds: [[0,0], [-500, 500]]
    });

    /*
    페이튼                  Peyton

    이름 없는 협곡          No Name Canyon
    칼라자 마을             Calaza Village
    울부짖는 늪지대         Howling Swamp
    그늘진 절벽             Shady Cliff
    폐허가 된 고성(던전)    Old Castle Ruins (Dungeon)
    붉은 달의 흔적          Red Moon Trail
    죄악의 동굴         Cave of Sin
    */

    area.registerMap("No Name Canyon", {
        type: MapTypeEnum.Continent,
        bounds: [[-320, 99], [-400, 205]]
    });

    area.registerMap("Calaza Village", {
        type: MapTypeEnum.City,
        bounds: [[-211, 108], [-300, 200]]
    });

    area.registerMap("Howling Swamp", {
        type: MapTypeEnum.Continent,
        bounds: [[-210, 208], [-306, 303]]
    });

    area.registerMap("Shady Cliff", {
        type: MapTypeEnum.Continent,
        bounds: [[-199, 0], [-310, 100]]
    });

    area.registerMap("Red Moon Trail", {
        type: MapTypeEnum.Continent,
        bounds: [[-210, 314], [-305, 408]]
    });

    area.registerMap("Old Castle Ruins", {
        type: MapTypeEnum.Dungeon,
        bounds: [[-101, 206], [-204, 310]]
    });

    area.registerMap("Cave of Sin", {
        type: MapTypeEnum.Dungeon,
        bounds: [[-7, 308], [-103, 403]]
    });

})();