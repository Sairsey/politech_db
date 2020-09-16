function my_post_request(path)
{
  let xhr = new XMLHttpRequest();
  xhr.open('POST', path, false);

  try {
    xhr.send();
    if (xhr.status != 200)
    {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } 
    else 
    {                
    return (xhr.response);
    }
  } 
  catch(err) 
  { // для отлова ошибок используем конструкцию try...catch вместо onerror
    alert(err);
  }
}