const fs = require('fs');

let dsm = JSON.parse(fs.readFileSync('hst.json').toString());

for (let ceID in dsm.ce_set) {
    // get the path to the ce
    let cePath = `./ces/${ceID}.json`;
    let ceObj = JSON.parse(fs.readFileSync(cePath).toString());
    // i need to create a teaser asset for each ce and add it to the ce
    // make the asset
    let assetPath = `./assets/${ceID}-teaser.json`;
    let assetObj = {
        id: `${ceID}-teaser`,
        version: '0.0.0',
        url: JSON.parse(fs.readFileSync(`assets/${ceID}.json`).toString()).url.replace(/mp4/, 'webp'),
        type: 'image/webp',
        title: dsm.ce_set[ceID].title,
        options: { }
    };

    ceObj.playlist.unshift(assetObj.id);

    // write the asset
    fs.writeFile(assetPath, JSON.stringify(assetObj, null, '\t'), () => {
        console.log(`Wrote to: ${assetPath}`);
    });

    // write the ce
    fs.writeFile(cePath, JSON.stringify(ceObj, null, '\t'), () => {
        console.log(`Wrote to: ${cePath}`);
    });
}
