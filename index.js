const fs = require('fs');
const gunzip = require('gunzip-maybe');
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
    const writestream = fs.createWriteStream(path.resolve(__dirname, `./out/${header.name}`));
    estream.pipe(writestream);

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
  const rstream = fs.createReadStream(path.resolve(__dirname, file));
  rstream.pipe(gunzip(2)).pipe(extract);
}
