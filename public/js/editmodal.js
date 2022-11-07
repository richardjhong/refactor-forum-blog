document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

const hitEscapeKey = () => {
  const escapeKey = document.createEvent("Events");
  escapeKey.initEvent("keydown", true, true);
  escapeKey.keyCode = 27;
  escapeKey.which = 27;
  document.dispatchEvent(escapeKey);
}

const editPostHandler = async (e) => {
  e.preventDefault();
  const editTitle = await e.target.dataset.title;
  const editContent = await e.target.dataset.content;
  const editID = await e.target.dataset.post_id;
  const editUserID = await e.target.dataset.user_id;

  const editFormTitle = document.querySelector("#edit-post-title")
  const editFormContent = document.querySelector("#edit-post-content")
  const editFormTag = document.querySelector("#edit-post-tag")

  editFormTitle.value = editTitle
  editFormContent.value = editContent
  editFormTag.innerText = `Editing Post ${editID}`
}

const modalTrigger = document.querySelectorAll('.js-modal-trigger')
modalTrigger.forEach(trigger => {
  trigger.addEventListener('click', editPostHandler);
})

const submitEditHandler = async (e) => {
  e.preventDefault();
  const editTagArr = document.querySelector("#edit-post-tag").innerText.split(' ')
  
  const response = await fetch(`/api/posts/${editTagArr[2]}`, {
    method: 'PUT',
    body: JSON.stringify(
      {
      "title": document.querySelector("#edit-post-title").value,
      "content": document.querySelector("#edit-post-content").value,
      "date_created": new Date(),
      "user_id": 0,
      }
    ),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    hitEscapeKey()
    document.location.replace(`/dashboard`)
  } else {
    alert('Failed to edit post.');
  }
} 

document  
  .querySelector('#edit-post-form')
  .addEventListener('submit', submitEditHandler);