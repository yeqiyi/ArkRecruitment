/* eslint-disable no-unused-vars */
const Path = require('path');
const { URL } = require('url');
const Fse = require('fs-extra');
const recruitdata = require('./data/CharacterData.json');
const Axios = require('axios');

const ua =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';
recruitdata.sort((a, b) => {
    return a.Id - b.Id;
})
const downloadAvatar = (url, dest) => {
    if (!Fse.pathExistsSync(dest)) {
        return Axios.get(url, {
            headers: { 'User-Agent': ua },
            responseType: 'stream',
            timeout: 2000,
        }).then(({ data }) => {
            //console.log('data:', data);
            data.pipe(Fse.createWriteStream(dest))
            data.on('end', () => {
                console.log(`${url} download completed`);
            });
            data.on('error', e => {
                console.log(`${url} save failed`);
            });
        }).catch((e) => {
            console.log(`retry download ${url}`);
            if (Fse.existsSync(dest)) Fse.unlinkSync(dest);
            downloadAvatar(url, dest);
        });
    } else {
        console.log(`${dest} already exists! Skip...`);
    }
};

for (let char of recruitdata) {
    let url = char.AvatarUrl;
    let dest = Path.join(__dirname, `./assets/avatar/${char.Id}.png`);
    downloadAvatar(url, dest);
}
//Fse.writeFile(Path.join(__dirname, './data/characters.json'), JSON.stringify(recruitdata));