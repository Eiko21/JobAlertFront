$(function(){
  console.log("Start");
  $("#track").click(track)
})
  
async function track() {
  let result, match;
  let data = {
    email: "",
    subscription: ""
  };
  await chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    const url = tabs[0].url;
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
      result = match[1]
      if(result === "jobs.lever.co" || result === "boards.greenhouse.io"){
        //let filter = (/\b.*(?=(\.))/);
        result = url.match(/\/([^/]*)$/)[1];
      }else{
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
          result = match[1]
        }
        let filter = (/\b.*(?=(\.))/);
        result = filter.exec(result);
      }
    }
    data.subscription = result[0];
    chrome.storage.local.get(['email'], function(result){
      data.email= result.email;
      subscribe(data)
    })
  });
}

async function subscribe(data){
  axios.post('http://localhost:3333/api/subscriptions/subscribe', data)
  .then(function (response) {
    // handle success
    if(response.status === 200){
      return true;
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}
$("#but").on("click", function(){
  track();
})
