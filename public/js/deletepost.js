const deletePostHandler = async (e) => {
  e.preventDefault()
  const deleteID = await e.target.dataset.post_id;

  const response = await fetch(`/api/posts/${deleteID}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.replace(`/dashboard`)
  } else {
    alert('Failed to delete post.');
  }
}

const allDeleteButtons = document.querySelectorAll('.delete-button')
allDeleteButtons.forEach(button => {
  button.addEventListener('click', deletePostHandler);
})