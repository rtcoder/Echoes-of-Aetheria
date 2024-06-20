const images = [
    'heart_full.png',
    'heart_empty.png',
];
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
};


function getImagePaths(obj, prefix = '') {
    let paths = [];

    for (let key in obj) {
        if (obj[key] instanceof Image) {
            paths.push({ path: `${prefix}${key}`, image: obj[key] });
        } else if (typeof obj[key] === 'object') {
            paths = paths.concat(getImagePaths(obj[key], `${prefix}${key}.`));
        }
    }

    return paths;
}

export function loadAssets() {
    const imagePaths = getImagePaths(Assets.img);
    const imagesToLoad = imagePaths.length;

    return new Promise((resolve, reject) => {
        let loaded = 0;

        const loadFn = () => {
            loaded++;
            if (loaded >= imagesToLoad) {
                resolve();
            }
        };

        imagePaths.forEach(({ path, image }) => {
            const srcPath = './src/assets/img/' + path.replace(/\./g, '/') + '.png';
            image.src = srcPath;
            image.onload = loadFn;
            image.onerror = () => {
                reject(new Error(`Failed to load image: ${srcPath}`));
            };
        });

        if (imagesToLoad === 0) {
            resolve();
        }
    });
}
