const addCommentHandler = async (e) => {
  e.preventDefault();

  const comment = document.querySelector('#new-comment').value.trim();

  console.log('new comment: ', comment)

  if (comment) {
    console.log('hi')
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify(
        {
          "content": comment,
          "date_created": new Date(),
          "user_id": 2,
          "post_id": 1
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