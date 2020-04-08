(function(){

    class LostArkIslandRegister {

        constructor() {
            this.entries = {};
            this.nextEntryId = 0;
        }

        initialize() {
            this.initializeUI();
        }

        initializeUI() {
        }

        registerIsland(name, markerData) {
            let zoomLevel = markerData.maxZoomLevel;
            if(zoomLevel === undefined) {
                zoomLevel = this.areas[markerData.area].zoomLevel;
            }

            let mapId = this.nextEntryId++;
            let filterData = '';

            // Create the element
            let imageName = name.replace(/\s+/g, '-').toLowerCase() + '.jpg';
            let elementText = '<div class="card treasure-map-card" style="margin: 8px" ' + filterData + '>' +
                '<img class="card-img-top" src="images/island_preview/'+ imageName +'" style="width: 150px; height: 150px;"/>' +
                '<div><p class="card-text">';

            elementText = elementText + '<b class="loc-txt">' + _L(name) + '</b></p>';

            elementText = elementText + '<p class="small loc-txt" style="width: 180px;">' + _LF(name, LocalizationLanguage.Korean) + '</p>';

            elementText = elementText + '<a role="button" class="btn btn-sm btn-outline-secondary island-register-link" href="#" data-target="' + mapId +'">Show</a></div></div>';

            $('#content_island_register_list').append($(elementText));

            this.entries[mapId] = markerData;
        }

        showIsland(id) {
            if(id === undefined) {
                return;
            }

            let markerData = this.entries[id];
            LAM.gotoMapArea(markerData.teleportTo, markerData.teleportArea);
        }
    }

    $(document).ready(function() {
        $('body').on('click', 'a.island-register-link', function() {
            let target = $(this).data('target');

            LAM.islandRegister.showIsland(target);
        });

    });

    LAM.islandRegister = new LostArkIslandRegister();

})();