'use strict';
import { BaseEvent } from '../tools/event_manager.js';
import { RequestJs } from '../tools/request.js';


// ===================================================================================================== //


document.addEventListener('DOMContentLoaded', async () => {
    const namePage = document.body.dataset.page;
    console.log(`\nMain script loaded ... Page: ${namePage}`);

    // -----
    const apiClientJs = new RequestJs({baseUrl: window.location.origin + '/api/v1/'});
    const baseEv = new BaseEvent();
    baseEv.attachDOMEvents();

    // -----

    if ( namePage === 'index_page' ) {
        const { init_page_index } = await import('./index_page/index.js');
        init_page_index(baseEv, apiClientJs);
    }

});
