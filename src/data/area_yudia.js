(function(){

    let area = LAM.createArea("Yudia", {
        kr: "유디아",
        path: "maps/areas/Yudia",
        zoomLevel: 4
    });

    area.registerMap("Saland Hills", {
        kr: "살란드 구릉지",
        type: MapTypeEnum.Continent,
        markers: [
            { x: -468.69, y: 416.88, title: "To Borderlands (Artemis)", type: MarkerTypeEnum.Zoning,
                teleportTo: [-16.94, 255.63],
                teleportArea: 'Artemis'},

            { x: -353.75, y: 426.74, title: "Morai Ruins Dungeon", type: MarkerTypeEnum.Zoning,
                teleportTo: [-457.94, 297.07]},

            { x: -317.44, y: 409.07, title: "To Ozhorn Hills", type: MarkerTypeEnum.Zoning,
                teleportTo: [-229.62, 418.38]},

            { x: -424.81, y: 389.64, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint1.jpg"},

            { x: -443.87, y: 471.32, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint2.jpg"},

            { x: -419.87, y: 426.32, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint3.jpg"},

            { x: -419.94, y: 431.76, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint4.jpg"},

            { x: -404.5, y: 400.07, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint5.jpg"},

            { x: -330.12, y: 443.45, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint6.jpg"},

            { x: -324.5, y: 496.75, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint7.jpg"},

            { x: -312.06, y: 431.25, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint8.jpg"},

            { x: -283.5, y: 457.75, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/SalandMokokoHint9.jpg"},

            { x: -464.12, y: 415.32, popupText: "영원을 함께하는 #2", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint1.jpg"},

            { x: -417.87, y: 420.7, popupText: "불길한 예언", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint2.jpg"},

            { x: -417.56, y: 438.76, popupText: "태양소금 사탕 #2-1", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint3.jpg"},

            { x: -373.37, y: 436, popupText: "영원을 함께하는 #2", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint4.jpg"},

            { x: -339.81, y: 427.82, title: "토도도가 #4", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint5.jpg"},

            { x: -332.87, y: 412.64, title: "토도도가 #3", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint6.jpg"},

            { x: -315.56, y: 418.01, title: "토도도가 #2", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint7.jpg"},

            { x: -315.06, y: 434.45, title: "토도도가 #1", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint8.jpg"},

            { x: -325.94, y: 426.76, title: "태양소금 사탕 #1", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint9.jpg"},

            { x: -332.75, y: 441.44, title: "영원을 함께하는 #1", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint10.jpg"},

            { x: -331.44, y: 448.01, title: "이름의 유래", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint11.jpg"},

            { x: -329.56, y: 445.57, title: "태양소금 사탕 #3", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint12.jpg"},

            { x: -322.37, y: 446.76, title: "태양소금 사탕 #2-2", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint13.jpg"},

            { x: -336.5, y: 469.19, title: "백발백중", type: MarkerTypeEnum.HiddenStory,
                hintImage: "yudia/SalandHiddenStoryHint14.jpg"},

            { x: -456.25, y: 413.88, popupText: "자연산 뭉카 육포", type: MarkerTypeEnum.CookingIngredient,
                hintImage: "yudia/SalandCookingIngredientHint1.jpg"},

            { x: -421.19, y: 457, popupText: "소금 과자", type: MarkerTypeEnum.CookingIngredient,
                hintImage: "yudia/SalandCookingIngredientHint2.jpg"},

            { x: -338.37, y: 466.2, popupText: "소금벌레 소금구이", type: MarkerTypeEnum.CookingIngredient,
                hintImage: "yudia/SalandCookingIngredientHint3.jpg"},

            { x: -330.62, y: 446.76, popupText: "남은 기우제 음식", type: MarkerTypeEnum.CookingIngredient,
                hintText: "살란드 구릉지 NPC - 소금사막의 천둥<br>호감도 신뢰 달성 시 식재료 획득 가능",
                hintImage: "yudia/SalandCookingIngredientHint4.jpg"},

            { x: -305.44, y: 485.06, popupText: "소금 웜 똥", type: MarkerTypeEnum.FoodIngredient,
                hintText: "살란드 구릉지 요리사NPC - 헬라<br>웜 똥 커피 식재료",
                hintImage: "yudia/SalandFoodIngredientHint1.jpg"},

            { x: -438.69, y: 401.88, popupText: "우두머리 뭉카", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint1.jpg"},

            { x: -412.12, y: 400.07, popupText: "소금사막 도적단 투사 #1", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint2.jpg"},

            { x: -361.94, y: 465.19, popupText: "나이든 소금 바위 거북 #1", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint3.jpg"},

            { x: -342.69, y: 420.95, popupText: "날카로운 왈루 선인장", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint4.jpg"},

            { x: -344.56, y: 446.44, popupText: "단단한 소금벌레", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint5.jpg"},

            { x: -342.94, y: 501.87, popupText: "소금사막 도적단 투사", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint6.jpg"},

            { x: -332, y: 460.63, popupText: "우두머리 베티모스", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint7.jpg"},

            { x: -308, y: 485.69, popupText: "더러운 소금웜", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint8.jpg"},

            { x: -293.56, y: 445.07, popupText: "나이든 소금 바위 거북 #2", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/SalandBossHint9.jpg"},

            { x: -333.5, y: 457.44, popupText: "소금거인", type: MarkerTypeEnum.WorldBoss,
                hintImage: "yudia/SalandWorldBossHint1.jpg"},

            { x: -401.25, y: 433.57, popupText: "소금 작업장", type: MarkerTypeEnum.Vista,
                hintImage: "yudia/SalandVistaHint1.jpg"},

            { x: -335.06, y: 450.51, popupText: "유랑민 캠프", type: MarkerTypeEnum.Vista,
                hintImage: "yudia/SalandVistaHint2.jpg"},

            { x: -357, y: 459.94, popupText: "그룹 퀘스트", type: MarkerTypeEnum.GroupQuest,
                hintText: "보상 : 영구 스탯 증가",
                hintImage: "yudia/SalandGroupQuestHint1.jpg"},

            { x: -323.81, y: 444.13, popupText: "소금사막의 천둥", type: MarkerTypeEnum.FavorNPC,
                hintText: "시간의 파편x3 (카드)<br>천둥 (카드)<br>기우제를 위한 재료(모험의 서) / 친절 증가 물약",
                hintImage: "yudia/SalandFavorNPCHint1.jpg"}
        ]
    });

    area.registerMap("Ozhorn Hills", {
        kr: "오즈혼 구릉지",
        type: MapTypeEnum.Continent,
        markers: [
            { x: -229.62, y: 418.38, title: "To Saland Hills", type: MarkerTypeEnum.Zoning,
                teleportTo: [-317.44, 409.07]},
        ]
    });

    area.registerMap("Sapira Cave", {
        kr: "사피라 동굴",
        type: MapTypeEnum.Dungeon,
        markers: [
        ]
    });

    area.registerMap("Morai Ruins", {
        kr: "모라이 유적",
        type: MapTypeEnum.Dungeon,
        markers: [
            { x: -457.94, y: 297.07, title: "To Saland Hills", type: MarkerTypeEnum.Zoning,
                teleportTo: [-353.75, 426.74]},

            { x: -432.56, y: 297.26, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/MoraiMokokoHint1.jpg"},

            { x: -413.75, y: 284.2, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/MoraiMokokoHint2.jpg"},

            { x: -397.25, y: 294.88, type: MarkerTypeEnum.Mokoko,
                hintText: "2 seeds at this location",
                hintImage: "yudia/MoraiMokokoHint3.jpg"},

            { x: -396.31, y: 295.94, type: MarkerTypeEnum.Mokoko,
                hintText: "2 seeds at this location",
                hintImage: "yudia/MoraiMokokoHint3.jpg"},

            { x: -385.75, y: 304.13, type: MarkerTypeEnum.Mokoko,
                hintImage: "yudia/MoraiMokokoHint4.jpg"},

            { x: -385.75, y: 303.13, type: MarkerTypeEnum.Mokoko,
                hintText: "2 seeds at this location",
                hintImage: "yudia/MoraiMokokoHint4.jpg"},

            { x: -382, y: 307.07, type: MarkerTypeEnum.Mokoko,
                hintText: "2 seeds at this location",
                hintImage: "yudia/MoraiMokokoHint5.jpg"},

            { x: -381.44, y: 308, type: MarkerTypeEnum.Mokoko,
                hintText: "2 seeds at this location",
                hintImage: "yudia/MoraiMokokoHint5.jpg"},

            { x: -371.06, y: 310.69, type: MarkerTypeEnum.Mokoko,
                hintText: "2 seeds at this location",
                hintImage: "yudia/MoraiMokokoHint6.jpg"},

            { x: -370.31, y: 311.69, type: MarkerTypeEnum.Mokoko,
                hintText: "2 seeds at this location",
                hintImage: "yudia/MoraiMokokoHint6.jpg"},

            { x: -391.87, y: 318.63, type: MarkerTypeEnum.Mokoko,
                hintText: "2 seeds at this location",
                hintImage: "yudia/MoraiMokokoHint7.jpg"},

            { x: -411.25, y: 286.07, popupText: "우두머리 모라이 주술사 토병", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/MoraiBossHint1.jpg"},

            { x: -390, y: 323.19, popupText: "외로운 모라이 전사 토병", type: MarkerTypeEnum.Boss,
                hintImage: "yudia/MoraiBossHint2.jpg"},

            { x: -401.44, y: 300.5, type: MarkerTypeEnum.SecretPassage,
                hintText: "쭉 가면 모코코2개",
                hintImage: "yudia/MoraiSecretHint1.jpg"},

            { x: -392.81, y: 319.19, type: MarkerTypeEnum.SecretPassage,
                hintImage: "yudia/MoraiSecretHint2.jpg"},

            { x: -387.75, y: 305.69, type: MarkerTypeEnum.SecretPassage,
                hintImage: "yudia/MoraiSecretHint3.jpg"},

            { x: -383.69, y: 308.25, type: MarkerTypeEnum.SecretPassage,
                hintImage: "yudia/MoraiSecretHint4.jpg"}
        ]
    });

})();