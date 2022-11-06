const addCommentHandler = async (e) => {
  e.preventDefault();

  const comment = await document.querySelector('#new-comment').value.trim();
  const user_id = await document.getElementById("post-hb-script").getAttribute( "data-user_id");
  const post_id = await document.getElementById("post-hb-script").getAttribute( "data-post_id");

  if (comment) {
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify(
        {
        "content": comment,
        "date_created": new Date(),
        "user_id": user_id,
        "post_id": post_id
        }
      ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add comment.');
    }
  }
}

document  
  .querySelector('.comment-form')
  .addEventListener('submit', addCommentHandler);