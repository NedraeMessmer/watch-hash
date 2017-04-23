## watch-hash

Simple node app to rename files.

The new name is the sha1 hash of the file. Drop 'em in `in`, grab 'em from `out`.

Start with `npm start` or `yarn start` or `node ./index.js`

Configuration coming later; for now, edit `index.js` to fiddle with things.

#### TODO:

* [ ] Flags to set watch/output paths
* [ ] Customize the new filename
  * [ ] Option to use other hashing algorithms
  * [ ] Option to use timestamps
* [ ] Better name or something I dunno

### License

[MIT](https://opensource.org/licenses/MIT)
