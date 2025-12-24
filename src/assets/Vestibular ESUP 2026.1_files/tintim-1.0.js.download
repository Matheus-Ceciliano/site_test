(function () {
    var tt = window.tt || {};

    tt.init = function () {
        this.saveParams();
        this.addParamsToLinksOnEvent();
    };

    tt.addParamsToLinksOnEvent = function () {
        const links = document.querySelectorAll('a[href*="tintim.link"], a[href*="s.tintim.app"]');

        for (const link of links) {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                const url = new URL(link.href);

                const cookies = document.cookie.split('; ').reduce((obj, cookie) => {
                    const [fullName, value] = cookie.split('=');
                    if (fullName.startsWith("tt_")) {
                        const name = fullName.replace("tt_", "");
                        obj[name] = decodeURIComponent(value);
                    }
                    return obj;
                }, {});

                for (const [name, value] of Object.entries(cookies)) {
                    if (!url.searchParams.has(name)) {
                        url.searchParams.append(name, value);
                    }
                }

                window.location.href = url.toString();
            });
        }
    };

    tt.saveParams = function () {
        const queryParams = new URLSearchParams(window.location.search);
        // Lista de parâmetros válidos agrupados por tipo
        const validParams = [
            // Parâmetros UTM
            "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",

            // Facebook
            "fbclid", "tintim_fbid",

            // Google Ads
            "gclid", "gad_source",

            // IDs de campanha e grupos
            "campaignid", "adsetid", "adset", "adid", "adgroupid", "targetid", "adcampaign", "groupid",

            // HubSpot
            "__hsfp", "__hssc", "__hstc", "__s", "_hsenc", "hsCtaTracking",

            // Outros serviços de rastreamento
            "_openstat", "dclid", "mc_eid", "mkt_tok",
            "ml_subscriber", "ml_subscriber_hash", "msclkid",
            "oly_anon_id", "oly_enc_id", "rb_clickid", "s_cid",
            "vero_conv", "vero_id", "wickedid", "yclid",

            // Genérico
            "src"
        ];

        for (const [name, value] of queryParams.entries()) {
            if (validParams.includes(name)) {
                document.cookie = `tt_${name}=${encodeURIComponent(value)}; path=/`;
            }
        }
    }

    tt.init();
})();