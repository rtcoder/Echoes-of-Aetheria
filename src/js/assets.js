export const Assets = {
    img: {
        heart_full: new Image(),
        heart_empty: new Image(),
        bg: {
            level_1_bg: new Image(),
            level_1_clouds_bg: new Image(),
            level_1_fg: new Image(),
            level_2_bg: new Image(),
        },
        sword: {
            red: new Image(),
            blue: new Image(),
        },
        player: {
            walk: {
                up: {
                    0: new Image(),
                    1: new Image(),
                    2: new Image(),
                    3: new Image(),
                    4: new Image(),
                    5: new Image(),
                    6: new Image(),
                    7: new Image(),
                    8: new Image(),
                },
                down: {
                    0: new Image(),
                    1: new Image(),
                    2: new Image(),
                    3: new Image(),
                    4: new Image(),
                    5: new Image(),
                    6: new Image(),
                    7: new Image(),
                    8: new Image(),
                },
                left: {
                    0: new Image(),
                    1: new Image(),
                    2: new Image(),
                    3: new Image(),
                    4: new Image(),
                    5: new Image(),
                    6: new Image(),
                    7: new Image(),
                    8: new Image(),
                },
                right: {
                    0: new Image(),
                    1: new Image(),
                    2: new Image(),
                    3: new Image(),
                    4: new Image(),
                    5: new Image(),
                    6: new Image(),
                    7: new Image(),
                    8: new Image(),
                },
            },
        },
        fire_flame: {
            0: new Image(),
            1: new Image(),
            2: new Image(),
            3: new Image(),
            4: new Image(),
            5: new Image(),
        },
        shuriken: {
            0: new Image(),
            1: new Image(),
            2: new Image(),
            3: new Image(),
            4: new Image(),
            5: new Image(),
            6: new Image(),
            7: new Image(),
            8: new Image(),
            9: new Image(),
            10: new Image(),
            11: new Image(),
            12: new Image(),
            13: new Image(),
            14: new Image(),
            15: new Image(),
            16: new Image(),
            17: new Image(),
            18: new Image(),
            19: new Image(),
            20: new Image(),
            21: new Image(),
            22: new Image(),
            23: new Image(),
            24: new Image(),
            25: new Image(),
            26: new Image(),
            27: new Image(),
            28: new Image(),
            29: new Image(),
            30: new Image(),
            31: new Image(),
            32: new Image(),
            33: new Image(),
            34: new Image(),
            35: new Image(),
        },
    },
    audio: {
        step: new Audio(),
        step1: new Audio(),
        step2: new Audio(),
        hit: new Audio(),
        jump: new Audio(),
        attack: new Audio(),
    },
};

function getMediaPaths(obj, prefix = '') {
    let paths = [];

    for (let key in obj) {
        if (obj[key] instanceof Image || obj[key] instanceof Audio) {
            paths.push({path: `${prefix}${key}`, asset: obj[key]});
        } else if (typeof obj[key] === 'object') {
            paths = paths.concat(getMediaPaths(obj[key], `${prefix}${key}.`));
        }
    }

    return paths;
}

export function loadAssets() {
    const assetsPaths = getMediaPaths(Assets);
    const mediaToLoad = assetsPaths.length;

    return new Promise((resolve, reject) => {
        let loaded = 0;

        const loadFn = (path) => {
            return () => {
                loaded++;
                if (loaded >= mediaToLoad) {
                    resolve();
                }
            };
        };

        assetsPaths.forEach(({path, asset}) => {
            let extension = '';
            if (asset instanceof Image) {
                extension = 'png';
            }
            if (asset instanceof Audio) {
                extension = 'wav';
            }
            const srcPath = './src/assets/' + path.replace(/\./g, '/') + '.' + extension;
            asset.src = srcPath;
            asset.onload = loadFn(path);
            if (asset instanceof Audio) {
                asset.oncanplaythrough = loadFn(path);
            }
            asset.onerror = () => {
                reject(new Error(`Failed to load asset: ${srcPath}`));
            };
        });

        if (mediaToLoad === 0) {
            resolve();
        }
    });
}
