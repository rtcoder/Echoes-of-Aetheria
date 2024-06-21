export const Assets = {
    img: {
        heart_full: new Image(),
        heart_empty: new Image(),
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
