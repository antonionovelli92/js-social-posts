const posts = [
    {
        "id": 7,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Adad maiores et sint voluptate recusandae architecto.",
        "pictrue": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Antonio Novelli",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "05-22-2022"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Adad maiores et sint voluptate recusandae architecto.",
        "pictrue": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Harry Kane",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 77,
        "created": "03-12-2022"
    },
    {
        "id": 10,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Adad maiores et sint voluptate recusandae architecto.",
        "pictrue": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Rudy Zerbi",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 5,
        "created": "12-22-2022"
    },
    {
        "id": 9,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Adad maiores et sint voluptate recusandae architecto.",
        "pictrue": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Maria De Filippi",
            "image": null
        },
        "likes": 40,
        "created": "12-25-2022"
    },
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Adad maiores et sint voluptate recusandae architecto.",
        "pictrue": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Babbo Natale",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 180,
        "created": "05-1-2022"
    }
];

// Prendo dal dom gli elementi 
const postListElement = document.getElementById('container');

// ! FUNZIONI
const createCard = (post) => {
    const { author, created, content, pictrue, id, likes } = post;
    const formatDate = (stringDate) => {
        const date = stringDate.split('-');
        const [month, day, year] = date;
        return `${day}/${month}/${year}`;
    };

    // creo l'immagine profilo (vedi bonus)
    const renderProfilePictrue = author => {
        // immagine con le iniziali
        const getInitials = name => {
            const words = name.split(' ');
            let initials = '';
            words.forEach(word => {
                initials += word.charAt(0).toUpperCase();
            });
            return initials.substring(0, 2);
        }
        const { image, name } = author;
        if (image) return `<img class="profile-pic" src="${image}" alt="${name}/>"`;
        else {
            const initials = getInitials(name);
            return `<div class="profile-pic-default"><span>${initials}</span></div>`;
        }
    }



    const card = `
       <div class="post">
        <div class="post__header">
          <div class="post-meta">
            <div class="post-meta__icon">
              ${renderProfilePictrue(author)}
            </div>
            <div class="post-meta__data">
              <div class="post-meta__author">${author.name}</div>
              <div class="post-meta__time">${formatDate(created)}</div>
            </div>
          </div>
        </div>
        <div class="post__text"> ${content} </div>
        <div class="post__image">
          <img src="${pictrue}" alt="post-image-${id}" />
        </div>
        <div class="post__footer">
          <div class="likes js-likes">
            <div class="likes__cta">
              <button class="like-button js-like-button" data-postid="${id}">
                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                <span class="like-button__label">Mi Piace</span>
              </button>
            </div>
            <div class="likes__counter">Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone</div>
          </div>
        </div>
      </div>
    `
    return card;

}

// ! OPERAZIONI INIZIALI....
let cards = '';

// Generiamo le cards
posts.forEach((post) => {
    cards += createCard(post);
})

postListElement.innerHTML = cards;

// terza MS
// ? Prendo il bottone...
const likeButton = document.querySelectorAll('.js-like-button');

likeButton.forEach((button) => {
    button.addEventListener('click', () => {
        // aggiungo la classe per far diventare il tasto verde
        button.classList.toggle('like-button--liked');
        // recupero il post id
        const postId = button.dataset.postid;

        // Recupero il contatore dei likes
        const likeCounter = document.getElementById(`like-counter-${postId}`);

        // Incremento i like
        let likes = parseInt(likeCounter.innerText);
        const isLiked = button.classList.contains('like-button--liked');
        likeCounter.innerText = isLiked ? ++likes : --likes;

    })

})