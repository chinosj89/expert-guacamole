
// Click on edit post
const updateProject = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#project-title').value;
    const description = document.querySelector('#project-description').value;

    // to make sure correct id is located 
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            postId: id,
            title,
            description,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert("Something wrong!");
    }
};

document.querySelector('.update-form').addEventListener('submit', updateProject);
