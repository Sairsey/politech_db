function my_post_request(path)
{
  let xhr = new XMLHttpRequest();
  xhr.open('POST', path, false);

  try {
    xhr.send();
    if (xhr.status != 200)
    {
      alert(`������ ${xhr.status}: ${xhr.statusText}`);
    } 
    else 
    {                
    return (xhr.response);
    }
  } 
  catch(err) 
  { // ��� ������ ������ ���������� ����������� try...catch ������ onerror
    alert(err);
  }
}