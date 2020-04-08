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
        bounds: [[-308, 208.95], [-411.5, 299.46]]
    });

    area.registerMap("Calaza Village", {
        type: MapTypeEnum.City,
        bounds: [[-203.5, 201.45], [-307.5, 305.96]]
    });

    area.registerMap("Howling Swamp", {
        type: MapTypeEnum.Continent,
        bounds: [[-302.5, 92.93], [-413.5, 199.45]]
    });

    area.registerMap("Shady Cliff", {
        type: MapTypeEnum.Continent,
        bounds: [[-106, 204.95], [-198, 299.46]]
    });

    area.registerMap("Red Moon Trail", {
        type: MapTypeEnum.Continent,
        bounds: [[-204, 304.96], [-307.5, 412.97]]
    });

    area.registerMap("Old Castle Ruins", {
        type: MapTypeEnum.Dungeon,
        bounds: [[7, 207.95], [-103, 300.46]]
    });

    area.registerMap("Cave of Sin", {
        type: MapTypeEnum.Dungeon,
        bounds: [[-100.5, 327.96], [-205.5, 389.97]]
    });

})();