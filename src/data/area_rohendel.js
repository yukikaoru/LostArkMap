(function(){

    let area = LAM.createArea("Rohendel", {
        path: "maps/areas/Rohendel",
        zoomLevel: 4,
        bounds: [[0,0], [-500, 500]]
    });

    // 은빛물결 호수      Silver Lake
    // 로아룬              Roarun
    // 유리연꽃 호수      Glass Lotus Lake
    // 바람향기 언덕      Wind Scent Hill
    // 파괴된 제나일      Devastated Jenna
    // 엘조윈의 그늘      Elzowin's Shadow
    // 공허의 미궁
    // 정령의 땅        Land of the Spirits (dungeon) -> Devastated Jenna
    // 몽환의 궁전   Palace of Dreams (dungeon) -> Elzowin's Shadow

    area.registerMap("Silver Lake", {
        type: MapTypeEnum.City,
        bounds: [[-270, 383], [-377, 520]]
    });

    area.registerMap("Roarun", {
        type: MapTypeEnum.Continent,
        bounds: [[-146, 272], [-253, 372]]
    });

    area.registerMap("Glass Lotus Lake", {
        type: MapTypeEnum.Continent,
        bounds: [[-134, 154], [-250, 249]]
    });

    area.registerMap("Wind Scent Hill", {
        type: MapTypeEnum.Continent,
        bounds: [[-261, 155], [-380, 249]]
    });

    area.registerMap("Devastated Jenna", {
        type: MapTypeEnum.Continent,
        bounds: [[-274, 1], [-361, 122]]
    });

    area.registerMap("Elzowin's Shadow", {
        type: MapTypeEnum.Continent,
        bounds: [[-12, 259], [-122, 381]]
    });

    area.registerMap("Void Labyrinth", {
        type: MapTypeEnum.Dungeon,
        bounds: [[-385, 250], [-508, 383]]
    });

    area.registerMap("Land of the Spirits", {
        type: MapTypeEnum.Dungeon,
        bounds: [[-387, 3], [-506, 127]]
    });

    area.registerMap("Palace of Dreams", {
        type: MapTypeEnum.Dungeon,
        bounds: [[-4, 121], [-124, 258]]
    });

})();