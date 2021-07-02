let get_short_url = async function(url) {
    const response = await fetch('http://localhost:3000/api/url', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({destination: url})
    });

    const data = await response.json();

    if (response.status !== 201) {
        document.querySelector('#response').innerHTML = data.message;
        return;
    }

    document.querySelector('#response').innerHTML = `<a href="${data.short_url}" target="_blank">${data.short_url}</a>`; 
}


let showstats = async function(short) {
    const response = await fetch('http://localhost:3000/api/'+short+'/stats', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      
    });
    console.log(response)
    if (response.status === 404) {
        document.querySelector('#stats-response').innerHTML = "Not Found"
        return;
    }
    const data = await response.json();
    console.log(data)
    let output = '';
  
    for (key in data) {
        if (key == '_id') continue; // do not display _id 
        output += `<p><strong>${key}:</strong> ${data[key]}</p>`;
    }

    document.querySelector('#stats-response').innerHTML = output;


   
}

window.onload = function() {
    document.querySelector('#send').addEventListener('click', function() {
        const url = document.querySelector('#url').value;
        get_short_url(url);
    });

    document.querySelector('#show').addEventListener('click', function() {
        const short = document.querySelector('#short').value;
        showstats(short);
    });
}

