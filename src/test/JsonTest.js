/* eslint-disable no-unused-vars */
const Fse = require('fs-extra');
const Path=require('path');

const recruitdata = require('../data/CharacterData.json');
/*
recruitdata.sort((a,b)=>(a.Id-b.Id));
console.log(Path.join(__dirname,'../data/CharacterData.json'));
var cnt=0;
recruitdata.forEach((val)=>{
    if(val.Approach==1){
        cnt++;
    }
})
Fse.writeFile(Path.resolve(__dirname,'../data/CharacterData.json'),JSON.stringify(recruitdata));
*/

const tags=require('../data/tag.json');
var i='2';
console.log(tags[i]);
console.log(Object.keys(recruitdata).length);