const classes = [
  new require('./example-strategy')
];

module.exports = classes.map(c => { return new c(); });