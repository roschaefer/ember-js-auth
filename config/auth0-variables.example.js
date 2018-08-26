module.exports = {
  clientId: "your client id",
  domain: "your auth0 domain",
  callbacks: {
    login: 'http://localhost:4200/callback',
    logout: 'http://localhost:4200/'
  }
}
