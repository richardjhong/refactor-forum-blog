const addPostHandler = async (e) => {
  e.preventDefault();

  const postTitle = await document.querySelector('#new-post-title').value.trim();
  const postContent = await document.querySelector('#new-post-content').value.trim();
  const user_id = await document.querySelector("#new-post-form").dataset.user_id;

  if (postTitle && postContent) {
    const response = await fetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify(
        {
        "title": postTitle,
        "content": postContent,
        "date_created": new Date(),
        "user_id": user_id,
        }
      ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`)
    } else {
      alert('Failed to add post.');
    }
  }
}

document  
  .querySelector('.post-form')
  .addEventListener('submit', addPostHandler);