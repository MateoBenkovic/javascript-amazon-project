/*
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();


const xhr = fetch(
  'http://supersimplebackend.dev/greeting' 
).then((response) => {
  return response.text();
}).then((text) => {
  console.log(text);
});


async function getGreeting() {
  const response = await fetch('https://supersimplebackend.dev/greeting');
  const text = await response.text();
  console.log(text);
}

getGreeting();


async function postGreeting() {
  try {
  const response = await fetch('https://amazon.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Mateo'
    })
  });
} catch(error) {
  console.log('CORS error. Your request was blocked by backend');
}
  const text = await response.text();
  console.log(text);
}
*/

async function postGreeting() {
  try {
  const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status >= 400) {
        throw response;
      }

  const text = await response.text();
  console.log(text);

} catch(error) {
  if (error.status === 400) {
    const jsonError = await error.json()
    console.log(jsonError);
  } else {
    console.log('Network error. Please try again later.');
  }
}
  
}



postGreeting();



