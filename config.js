'use strict';
 
var config = {
  port: 3000, //port where the app will be listening
  apiBaseURL: 'http://127.0.0.1:3000/agora/api/v1/members/', //base URL for members API
  realm: 'mycompany', //identify your company realm for API access authentication
  membersApiPageSize: 100, // API page size for going thru members list
  clients: { //list here the clients that will get access to app API, protected by HTTP basic auth
    cleaner: {
      secret: 'mysecret',
      company: 'A'
    },
    test: {
      secret: 'secretString',
      company: 'B'
    }
  },
  github: { //app credentials to consume github API
    clientId: 'Iv1.e52a3f3eb8f4c542',
    clientSecret: '586d168e8f12abda8a691a1d5d1124c02b0b3cee',
    adminToken: '', //token to act on behalf of an orga's owner
    callbackURL: 'http://localhost:3000/agora/auth/github/callback',
    orga: 'V-Call' //Name of the github organization to handle
  },
  email: {
    host: 'http://localhost:3000',
    port: 25,
    from: 'https://v-call.vercel.app/consol.agora/',
    subject: 'A new member has joined github',
    text: 'The github user {username} with validated email {email} has been invited to join your team {team} at https://github.com/{orga}'
  },
  companies: { // companies configuration
    TID: { // One company
      team: 'Blendit4', // name of the team where company users will be invited to join
      adminEmail: 'cupparikun@gmail.com', // email to send notifications to on new users that are invited to join
      allowedDomains: ['gmail.com', 'proton.com'], // allowed email domains
      isUserValidService: { // URL of is-user-valid service to check user validity (this constrain adds to the previous one)
        url: 'https://v-call.vercel.app/consol.agora/',
        clientId: 'Iv1.e52a3f3eb8f4c542',
        clientSecret: '586d168e8f12abda8a691a1d5d1124c02b0b3cee'
      }
    },
    Tokbox: { // Another company
      team: 'Tokbox',
      adminEmail: '',
      allowedDomains: ['tokbox.com']
    },
    MailCo: {
      team: 'deepcore',
      adminEmail: 'cupparikun@gmail.com',
      allowedDomains: ['gmail.com']
    }
  },
  userDatabase: './members' //where the database is
};