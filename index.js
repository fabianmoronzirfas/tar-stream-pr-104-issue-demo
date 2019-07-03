const fs = require('fs');
const pipe = require('pipe-io');
const zlib =require('zlib');
const path = require('path');
const tarStream = require('tar-stream');
const extract = tarStream.extract();

extract.on('finish', function() {
  // all entries read
  console.log('All done');
})

extract.on('entry', (header, estream, next) => {
  try {
    console.log(header);
    // const writestream = fs.createWriteStream(path.resolve(__dirname, `./out/${header.name}`));
    // estream.pipe(zlib.createGunzip()).pipe(writestream);

    estream.on('end', () => {
      console.log(`done with stream`);
      next();
    });
    return estream.resume();
    // estream.resume(); // this made the loop hang itself on the next tar archive
  } catch (error) {
    throw error;
  }
});
const files = ['./data/mini-one.tar.gz', './data/mini-two.tar.gz'];
for(const file of files){
  console.log(file);
  const rstream = fs.createReadStream(path.resolve(__dirname, file));
  pipe([rstream,zlib.createGunzip(), extract],(err)=>{
    if(err){
      throw err;
    }
    console.log(`done with ${file} pipe`);
  })

}
