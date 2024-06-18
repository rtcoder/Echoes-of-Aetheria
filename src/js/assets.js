const images = [
    'heart_full.png',
    'heart_empty.png',
];
export const Assets = {
    img: {
        heart_full: new Image(),
        heart_empty: new Image(),
    },
};

export function loadAssets() {
    let loaded = 0;
    const imagesToLoad = Object.keys(Assets.img).length;
    return new Promise((resolve, reject) => {
        const loadFn = () => {
            loaded++;
            if (loaded >= imagesToLoad) {
                resolve();
            }
        };

        Object.keys(Assets.img).forEach((imgKey, index) => {
            console.log({index, imgKey, imagesToLoad});
            Assets.img[imgKey].src =  './src/assets/img/' + (images[index] || 'xx');
            Assets.img[imgKey].onload = loadFn;
        });
    });
}
