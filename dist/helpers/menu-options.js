"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = void 0;
exports.getMenu = (role) => {
    const menu = [
        {
            title: 'Home',
            icon: 'mdi mdi-gauge',
            submenu: [
                {
                    title: 'Progress',
                    url: 'progress'
                },
                {
                    title: 'Chars',
                    url: 'charOne'
                },
                {
                    title: 'Promises',
                    url: 'promises'
                },
                {
                    title: 'Rxjs',
                    url: 'rxjs'
                }
            ]
        },
        {
            title: 'Settings',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                {
                    title: 'Users',
                    url: 'users'
                },
                {
                    title: 'Doctors',
                    url: 'doctors'
                },
                {
                    title: 'Hospital',
                    url: 'hospitals'
                }
            ]
        }
    ];
    if (role == 'USER_ROLE')
        menu[1].submenu.splice(0, 1);
    return menu;
};
