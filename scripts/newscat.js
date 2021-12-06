function handleRequest() {
  axios.post("url", { name: "data" }).then(function (response) {
    console.log(response)
    // do whatever you want if console is [object object] then stringify the response

    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://api.newscatcherapi.com/v2/search',
      params: { q: 'Bitcoin', lang: 'de', sort_by: 'relevancy', page: '1' },
      headers: {
        'x-api-key': 'YmVPIW1ZRIHjJ4iWTFuZb5ApECJAwTD2yiPL1CQfKH4'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  })
}