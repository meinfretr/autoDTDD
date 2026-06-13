export default {
  async fetch(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const gameName = searchParams.get('game'); 
    const targetUrl = `https://www.doesthedogdie.com/api/v3/items?q=${gameName}`;


    // Clone or create new headers to append your required X-API-KEY
    const newHeaders = new Headers();
    newHeaders.set("X-API-KEY", ${MY_DTDD_API_KEY});
    newHeaders.set("Accept", "application/json");

    const apiResponse = await fetch(targetUrl, {
      method: "GET",
      headers: newHeaders
    }).then(r => r.json()).then(data => 
      {
        for (let i = 0; i < data.length; i++) {
          if (data[i].itemTypeName !== "Video Game"){
            continue
          }
          else if (data[i].itemTypeName == "Video Game") {
            return `https://www.doesthedogdie.com/media/${data[i].id}`
          }
        }
        return "Sorry, check Google"
      }
    ).catch(error => "Sorry, check Google")

    //@ts-ignore
    return new Response(await apiResponse);
  }
};
