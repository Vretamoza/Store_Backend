const tokens = {
  tokens: ['6268e3d55f68ab72a69a4acf'],
  push: function(user_id) {
    this.tokens.push(user_id)
  },
  find: function(token){
    return this.tokens.find(t => t === token)
  }
}

module.exports = tokens
