/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)


    // Show configuration tile for editors only
    if (WA.player.tags.includes('editor')) {
        WA.room.showLayer('exitNorthConfig')
        WA.room.showLayer('exitSouthConfig')
        WA.room.showLayer('exitWestConfig')
        WA.room.showLayer('exitEastConfig')
    }

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

let currentZone: string;
let currentPopup: any;

const config = [
    {
        zone: 'needHelp',
        message: 'Your transformation partner for next-gen mission of IS&T.',
        cta: [
            {
                label: 'Meet us',
                className: 'primary',
                callback: () => WA.openTab('https://capgemini.com'),
            }
        ]
    },
    {
        zone: 'followUs',
        message: 'Co-build success together.',
        cta: [
            {
                label: 'LinkedIn',
                className: 'primary',
                callback: () => WA.openTab('https://www.linkedin.com/company/capgemini'),
            },
            {
                label: 'Twitter',
                className: 'primary',
                callback: () => WA.openTab('https://twitter.com/capgemini'),
            }
        ]
    },
]


WA.onEnterZone('needHelp', () => {
    currentZone = 'needHelp'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.onEnterZone('followUs', () => {
    currentZone = 'followUs'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.onLeaveZone('needHelp', closePopup);
WA.onLeaveZone('followUs', closePopup);


function openPopup(zoneName: string, popupName: string) {
    const zone = config.find((item) => {
        return item.zone == zoneName
    });
    if (typeof zone !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (typeof currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}