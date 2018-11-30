let LAM = (function(){

    class LostArkMap {

        constructor() {
            this.areas = {};
            this.guides = [];
            this.faq = [];
            this.areaMarkerData = {};
            this.markerIcons = {};
            this.dynamicLayers = {};
            this.activeArea = undefined;
            this.activeDynamicLayer = undefined;
            this.activeMarkerLayer = undefined;
            this.activeContent = undefined;
            this.suspendStatUpdate = true;
            this.copyLocationMode = false;
        }

        onMapClick(e) {
            let x = e.latlng.lat;
            let y = e.latlng.lng;

            if (this.copyLocationMode === true) {
                console.log('[' + x + ', ' + y + ']');
                L.DomUtil.removeClass(LAM.map._container,'crosshair-cursor-enabled');
                this.showCopyLinkDialog(this.getMapLink(x, y), "Copy Location");
            }
        }

        showCopyLinkDialog(path, title) {
            let link = "";
            if(window.location.origin !== null && window.location.origin !== "null") {
                link = window.location.origin;
            } else {
                link = 'file://';
            }

            this.showCopyTextDialog(link + window.location.pathname + path, title);
        }

        showCopyTextDialog(text, title){
            $('#copyTextModalTitle').text(title);
            $('#copyTextModal-text').val(text);
            $('#copyTextModal').modal();
        }

        getMapLink(x, y, customZoomLevel, customArea){
            if(x === undefined || y === undefined){
                return;
            }

            // Clamp to 2 digits
            x = Math.round(x * 100) / 100;
            y = Math.round(y * 100) / 100;

            let area = customArea || this.activeArea;
            let zoomLevel = customZoomLevel || LAM.map.getZoom();
            let areaMaxZoomLevel = this.areas[area].zoomLevel;

            // Ensure we have a valid zoom level
            if(zoomLevel > areaMaxZoomLevel || zoomLevel === undefined){
                zoomLevel = areaMaxZoomLevel;
            }

            // Ensure we don't link too far zoomed out
            if(zoomLevel < areaMaxZoomLevel - 1){
                zoomLevel = areaMaxZoomLevel - 1;
            }

            return "?c=" + ContentTypeEnum.AreaMap + "&a=" + area.replace('/\s/g', '_') + '&x=' + x + '&y=' + y + '&z=' + zoomLevel;
        }

        initialize() {

            this.map = L.map('la_map', {
                crs: L.CRS.Simple,
                minZoom: 0});

            this.map.setView([0, 0], 1);

            LAM.map.on("click", function(e) {
                LAM.onMapClick(e);
            });

            // Initialize all areas before loading the markers
            for (let name in this.areas) {
                this.areas[name].initialize();
            }

            for (let name in this.areas) {
                this.areas[name].loadMarkers();

                if(this.activeArea === undefined) {
                    this.activateArea(name);
                }
            }

            feather.replace();

            this.rebuildStats();

            $.urlParam = function(name){
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                if (results === null) {
                    return undefined;
                }

                return decodeURI(results[1]) || 0;
            };

            $('#createLayerButton').on('click', function (e) {
                let name = $('#createLayerForm-name').val();
                if(name === undefined || name === null || name === "") {
                    return;
                }

                LAM.createDynamicLayer(name, {});
            });

            for(let content in ContentTypeEnum) {
                $('#' + ContentTypeEnum[content]).hide();

                let contentToggle = $('#' + ContentTypeEnum[content] + '_toggle');
                contentToggle.click({id: ContentTypeEnum[content]}, function(e) {
                    LAM.activateContent(e.data.id);
                });

                contentToggle.removeClass('active');
            }

            if(Constants.EditMode) {
                LAM.editor.initialize();
            } else {
                $('#la_editor').hide();
            }

            $('#copyTextModal-copy').click(function(e){
                $('#copyTextModal-text').select();
                document.execCommand("copy");
                $('#copyTextModal').modal('toggle');
            });

            L.easyButton('fa-crosshairs', function(btn, map){
                //helloPopup.setLatLng(map.getCenter()).openOn(map);
                L.DomUtil.addClass(map._container,'crosshair-cursor-enabled');
                LAM.copyLocationMode = true;
            }).addTo( this.map );

            this.suspendStatUpdate = false;
            this.rebuildStats();
            this.buildGuidesContent();
            this.buildFAQContent();

            // Search needs to initialize after all content is complete
            LAM.search.initialize();

            this.processUrlParameters();

            $( "#loading-page" ).delay(200).fadeOut(200, function(){
                $( "#main-page" ).fadeIn(200, function () {
                    LAM.map.invalidateSize();
                });
            });
        }

        processUrlParameters() {
            let content = $.urlParam('c');
            if (content === undefined) {
                this.activateArea('World');
                this.gotoMapArea([-250, 250], undefined, 1);
                return;
            }

            switch (content) {
                case ContentTypeEnum.AreaMap: {
                    let area = $.urlParam('a');
                    let x = $.urlParam('x');
                    let y = $.urlParam('y');
                    let zoom = $.urlParam('z');
                    let markerId = $.urlParam('mid');
                    if (area === undefined || x === undefined || y === undefined) {
                        return;
                    }

                    area = area.replace(/_/g, ' ');

                    this.activateArea(area);
                    this.gotoMapArea([x, y], area, zoom);

                    if(markerId === undefined) {
                        this.activeMarkerLayer.createMarker({
                            x: x,
                            y: y,
                            type: MarkerTypeEnum.TargetMark,
                            title: area + ' ' + Math.round(x) + ' x ' + Math.round(y),
                            isGenerated: true
                        });
                    }

                    break
                }

                case ContentTypeEnum.Search: {
                    this.activateContent(content);

                    let searchText = $.urlParam('t');
                    if(searchText !== undefined){
                        searchText = searchText.replace(/_/g, ' ');

                        $('#searchField').val(searchText);
                        this.search.execSearch(searchText);
                    }

                    break
                }

                default: {
                    this.activateContent(content);
                    break
                }
            }
        }

        gotoMapArea(coordinates, customArea, customZoomLevel) {
            if(coordinates === undefined){
                return;
            }

            let area = customArea || this.activeArea;
            let zoomLevel = customZoomLevel || this.map.getZoom();
            let areaMaxZoomLevel = this.areas[area].zoomLevel;

            // Ensure we have a valid zoom level
            if(zoomLevel > areaMaxZoomLevel || zoomLevel === undefined){
                zoomLevel = areaMaxZoomLevel;
            }

            // Ensure we don't link too far zoomed out
            if(customZoomLevel === undefined && zoomLevel < areaMaxZoomLevel - 1){
                zoomLevel = areaMaxZoomLevel - 1;
            }

            this.activateArea(area);
            this.map.setView(coordinates, zoomLevel);
        }

        activateContent(type) {
            if(this.activeContent !== undefined) {
                $('#' + this.activeContent).hide();
                $('#' + this.activeContent + '_toggle').removeClass('active');

                if(this.activeContent === ContentTypeEnum.AreaMap && this.activeArea !== undefined) {
                    this.areas[this.activeArea].deactivate();
                }
            }

            this.activeContent = type;
            $('#' + type).show();

            $('#' + type + '_toggle').addClass('active');
        }

        registerArea(name, entry) {
            this.areas[name] = entry;

            console.log("Registered Area " + name);

            $('#createLayerForm-targetArea').append($('<option>' + name + '</option>'));
        }

        activateArea(name) {
            this.activateContent(ContentTypeEnum.AreaMap);

            if(this.activeArea !== undefined) {
                this.areas[this.activeArea].deactivate();
            }

            this.areas[name].activate();
            this.activeArea = name;
        }

        registerDynamicLayer(entry) {
            this.dynamicLayers[entry.id] = entry;
        }

        unregisterDynamicLayer(id) {
            if(this.activeDynamicLayer === id) {
                this.dynamicLayers[id].deactivate();
            }

            delete this.dynamicLayers[id];
        }

        activateDynamicLayer(id) {
            if(this.activeDynamicLayer !== undefined) {
                this.dynamicLayers[this.activeDynamicLayer].deactivate();
            }

            this.dynamicLayers[id].activate();
            this.activeDynamicLayer = id;
        }

        getMarkerIcon(markerType) {
            let result = this.markerIcons[markerType];
            if (result === undefined) {
                result = L.icon({
                    iconUrl: 'images/icons/' + markerType,
                    iconSize: [30, 30],
                    className: "ov-marker"});
                this.markerIcons[markerType] = result;
            }

            return result;
        }

        registerTreasureMap(markerData) {
            let zoomLevel = markerData.maxZoomLevel;
            if(zoomLevel === undefined) {
                zoomLevel = this.areas[markerData.area].zoomLevel;
            }

            let locationLink = "?c=" + ContentTypeEnum.AreaMap + "&a=" + markerData.area + '&x=' + markerData.x + '&y=' + markerData.y + '&z=' + zoomLevel;
            let elementText = '<div class="card" style="margin: 8px">' +
                '<img class="card-img-top" src="images/marker_hints/'+ markerData.hintImage +'" style="width: 180px; height: 228px;"/>' +
                '<div><p class="card-text">';
            if(markerData.zone !== undefined) {
                elementText = elementText + markerData.zone + '<br>';
            }

            elementText = elementText + '<b>' + markerData.area + '</b></p>';

            if(markerData.hintText !== undefined) {
                elementText = elementText + '<p class="small" style="width: 180px;">' + markerData.hintText + '</p>';
            }

            elementText = elementText + '<a role="button" class="btn btn-sm btn-outline-secondary" href="' + locationLink + '">Show</a>' +
                '</div></div>';

            let guideElement = $(elementText);

            $('#content_treasure_map_list').append(guideElement);
        }

        getMapTileUrl(path) {
            return function(o) {
                var url = path;
                var zoom = o.z;
                if (o.x < 0 || o.x >= Math.pow(2, zoom) ||
                    o.y < 0 || o.y >= Math.pow(2, zoom)) {
                    return path + '/../blank.png';
                } else if (zoom === 0) {
                    url += '/base';
                } else {
                    for (var z = zoom - 1; z >= 0; --z) {
                        var x = Math.floor(o.x / Math.pow(2, z)) % 2;
                        var y = Math.floor(o.y / Math.pow(2, z)) % 2;
                        url += '/' + (x + 2 * y);
                    }
                }
                
                return (url + '.jpg');
            }
        }

        getZoneType(area, zone) {
            let areaData = this.areas[area];
            if(areaData === undefined){
                return undefined;
            }

            return areaData.getZoneType(zone);
        }

        getAreaMarkerLayer(area) {
            let areaData = this.areas[area];
            if(areaData === undefined) {
                return undefined;
            }

            return areaData.markerLayer;
        }

        getMaxAreaZoom(area) {
            let areaData = this.areas[area];
            if(areaData === undefined) {
                return undefined;
            }

            return areaData.zoomLevel;
        }

        rebuildStats() {
            if(this.suspendStatUpdate) {
                return;
            }

            let statsPanel = $('#stats');
            statsPanel.empty();

            let markerStats = {};
            for (let name in this.areas) {
                let area = this.areas[name];
                for (let i in area.markerLayer.markers) {
                    let markerData = area.markerLayer.markers[i];
                    if (markerStats[markerData.type] === undefined) {
                        markerStats[markerData.type] = 0;
                    }

                    markerStats[markerData.type]++;
                }
            }

            for (let typeName in MarkerTypeEnum) {
                let markerImage = MarkerTypeEnum[typeName];
                switch (markerImage) {
                    // Ignore some markers
                    case MarkerTypeEnum.Internal:
                    case MarkerTypeEnum.Notice:
                    case MarkerTypeEnum.Zoning:
                    case MarkerTypeEnum.ZoningIslandPVP:
                    case MarkerTypeEnum.ZoningIsland:
                    case MarkerTypeEnum.ZoningIslandFlux:
                    case MarkerTypeEnum.ZoningWorld:
                    case MarkerTypeEnum.TargetMark:
                    case MarkerTypeEnum.SeaAreaAquatic:
                    case MarkerTypeEnum.SeaAreaDeath:
                    case MarkerTypeEnum.SeaAreaIce:
                    case MarkerTypeEnum.SeaAreaSandstorm:
                    case MarkerTypeEnum.SeaAreaSiren:
                    case MarkerTypeEnum.SeaAreaStorm: {
                        continue;
                    }
                }
                let markerTitle = MarkerTypeDefaultTitle(markerImage);
                let markerCount = markerStats[markerImage];
                if(markerCount === undefined) {
                    markerCount = 0;
                }

                let element = $('<li class="nav-item"></li>');
                this.activateLink = $('<a class="nav-link" href="#"></a>');
                this.activateLink.html('<span><img class="feather" src="images/icons/' + markerImage + '"/></span>' + markerCount + " " + markerTitle);

                element.append(this.activateLink);

                statsPanel.append(element);
            }
        }

        buildGuidesContent(){
            if(this.guideData === undefined) {
                return;
            }

            let guideContainer = $('#content_guides_list');
            guideContainer.empty();

            for(let i in this.guideData) {
                let guideData = this.guideData[i];

                let guideElement = $('<div class="col-sm" >' +
                    '<div class="card mb-4 shadow-sm" style="width: 250px;">' +
                    '<img class="card-img-top" src="images/guides/'+ guideData.preview +'" style="width: 230px; height: 230px;" />' +
                    '<div class="card-body">' +
                    '<p class="card-text">' + guideData.title + '</p>' +
                    '<div class="d-flex justify-content-between align-items-center">' +
                    '<div class="btn-group">' +
                    '<a role="button" class="btn btn-sm btn-outline-secondary" href="' + guideData.url +'" target="_blank">Show</a>' +
                    '</div></div></div></div></div>');

                guideContainer.append(guideElement);

                this.guides.push({
                    title: guideData.title,
                    url: guideData.url,
                    preview: guideData.preview
                });
            }
        }

        buildFAQContent(){
            if(this.faqData === undefined) {
                return;
            }

            let faqContainer = $('#faqContent');
            faqContainer.empty();

            for(let i in this.faqData) {
                let faqData = this.faqData[i];

                let elementId = 'faq_' + i;
                let faqElement = $('<div class="card"></div>');

                let faqContent = $('<div class="card-header"></div>');
                faqElement.append(faqContent);

                let faqQuestion = $('<a class="card-link" data-toggle="collapse" href="#collapse' + elementId + '">' + faqData.q + '</a>');
                faqContent.append(faqQuestion);

                let faqAnswer = $('<div id="collapse' + elementId + '" class="collapse show" data-parent="#faqContent"></div>');
                faqContent.append(faqAnswer);

                if(faqData.img !== undefined) {
                    faqAnswer.append($('<table><tr><td><img class="faqImage" src="' + faqData.img +'"</td><td class="card-body">'+faqData.a+'</td></tr></table>'))
                } else {
                    faqAnswer.append($('<div class="card-body">' + faqData.a + '</div>'));
                }

                faqContainer.append(faqElement);

                this.faq.push(faqData);
            }

            $('.collapse').collapse();
        }

    }

    return new LostArkMap();

})();