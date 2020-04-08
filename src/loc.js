(function(){

    class LostArkLocalization {

        constructor() {
            this.lang = LocalizationLanguage.English;
        }

        initialize() {
            if(LAM.hostC !== true) {
                return;
            }

        }

        setLanguage(newLang, updateUI) {
            if(newLang === undefined || newLang === this.lang){
                return;
            }

            console.log("Language set to " + newLang);
            this.lang = newLang;

            if(updateUI === true) {
                $('#langSelect').selectpicker('val', this.lang);
            }

            this.refresh();
        }

        refresh() {
            let elements = $('.' + Constants.LocalizedTextClass);
            elements.each(function(e){
                LAM.loc.refreshElement($(this));
            });
        }

        refreshElement(element){
            let originalText = element.data('ot');
            let text = element.text();

            if(text === undefined) {
                return;
            }

            if(originalText === undefined) {
                element.data('ot', text);
            } else {
                text = originalText;
            }

            element.text(this.getLocalized(text));
        }

        getLocalizedTextElement(text) {
            return '<span class="' + Constants.LocalizedTextClass + '">' + text + '</span>';
        }

        getLocalized(text) {
            return this.getLocalizedFixed(text, this.lang);
        }

        getLocalizedFixed(text, language) {
            if (text === undefined
                || typeof text !== 'string'
                || text.startsWith('xx_')) {
                return text;
            }

            if(text.startsWith('##')){
                // Consider the string localized already
                return text.substring(2, text.length);
            }

            switch (language) {
                case LocalizationLanguage.English: {
                    return text;
                }
            }

            if(LAM.locData[language] === undefined) {
                return text;
            }

            let localized = LAM.locData[language][text];
            if(localized === undefined){
                LAM.locMissing[language][text] = "";
                return text;
            }

            return localized;
        }

        registerLocalized(lang, src, localized) {
            if(LAM.locData[lang] === undefined
                || src === undefined
                || localized === undefined
                || src === localized) {
                return;
            }

            let existing = LAM.locData[lang][src];
            if(existing !== undefined) {
                console.error("Localization Duplicate: " + src + ' == ' + existing + ' --> ' + localized)
                return;
            }

            console.log('LOC_REGISTER: ' + src + ' --> ' + localized);
            LAM.locData[lang][src] = localized;
        }

        exportMissing() {
            const filename = 'loc_missing_' + this.lang + '.json';
            const jsonStr = JSON.stringify(LAM.locMissing, null, 4);

            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }
    }

    LAM.locData = {};
    LAM.locMissing = {};

    LAM.loc = new LostArkLocalization();

    $(document).ready(function() {
        $('#langSelect').on('changed.bs.select', function(){
            LAM.loc.setLanguage($(this).selectpicker('val'));
        });

        // Call a single refresh after document ready
        window.setTimeout(function() {LAM.loc.refresh();}, 200);
    });

})();

let _L = function(e) {
    return LAM.loc.getLocalized(e);
};

let _LF = function(e, lang) {
    return LAM.loc.getLocalizedFixed(e, lang);
};