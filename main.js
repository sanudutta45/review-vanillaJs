//store
class Store {
  static reviews = [
    {
      name: "Sanu Dutta",
      disignation: "Web Developer",
      img: "images/review1.jpg",
      review:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book",
    },
    {
      name: "Raj Dutta",
      disignation: "Web Developer",
      img: "images/review2.jpg",
      review:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book",
    },
    {
      name: "Ajay Dutta",
      disignation: "Web Developer",
      img: "images/review3.jpg",
      review:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book",
    },
    {
      name: "Sam Dutta",
      disignation: "Web Developer",
      img: "images/review4.jpg",
      review:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book",
    },
  ];
  static getReviews() {
    return localStorage.getItem("reviews")
      ? JSON.parse(localStorage.getItem("reviews"))
      : this.reviews;
  }
}

//ui class
class UI {
  static current = 0;
  static displayReview(data) {
    let reviewContainer = document.querySelector(".review-container");
    reviewContainer.innerHTML = `
        <img src=${data.img} alt="user" class="user-img">
        <div class="name">${data.name}</div>
        <div class="designation">${data.disignation}</div>
        <p class="review">${data.review}</p>
        `;
  }
  static nextReview() {
    const reviews = Store.getReviews();
    if (this.current === reviews.length) return;

    this.displayReview(reviews[++this.current]);
    if (this.current === reviews.length - 1)
      document.querySelector(".btn-right").classList.add("no-data");
    else if (
      document.querySelector(".btn-left").classList.contains("no-data")
    ) {
      document.querySelector(".btn-left").classList.remove("no-data");
    }
  }
  static prevReview() {
    const reviews = Store.getReviews();
    if (this.current === 0) return;

    this.displayReview(reviews[--this.current]);
    if (this.current === 0)
      document.querySelector(".btn-left").classList.add("no-data");
    else if (
      document.querySelector(".btn-right").classList.contains("no-data")
    ) {
      document.querySelector(".btn-right").classList.remove("no-data");
    }
  }

  static randomReview() {
    this.current = Utils.getRandomNumber();
    const reviews = Store.getReviews();
    this.displayReview(reviews[this.current]);
    if (this.current === 0)
      document.querySelector(".btn-left").classList.add("no-data");
    else if (this.current === reviews.length - 1)
      document.querySelector(".btn-right").classList.add("no-data");
    else {
      if (document.querySelector(".btn-right").classList.contains("no-data")) {
        document.querySelector(".btn-right").classList.remove("no-data");
      }
      if (document.querySelector(".btn-left").classList.contains("no-data")) {
        document.querySelector(".btn-left").classList.remove("no-data");
      }
    }
  }
}

class Utils {
  static getRandomNumber() {
    const reviews = Store.getReviews();
    return Math.floor(Math.random() * reviews.length);
  }
}

//display events
document.addEventListener("DOMContentLoaded", function () {
  const reviews = Store.getReviews();
  UI.displayReview(reviews[0]);
});

//next event
document
  .querySelector(".review-wrapper")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-left")) UI.prevReview();
    else if (e.target.classList.contains("btn-right")) UI.nextReview();
    else if (e.target.classList.contains("btn-random")) UI.randomReview();
  });
